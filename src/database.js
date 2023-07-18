var mysql = require('mysql');
var bcrypt = require('bcrypt');

var con = mysql.createConnection({
    host: "db-mysql-tor1-58148-do-user-11220454-0.b.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_TAgrepXtjZVgWsUok-V",
    port: 25060, 
    database: "defaultdb",
    dateStrings: 'date'
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
});

exports.con = con;

const cryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) throw err;

        bcrypt.hash(password, salt, function(err, hash) {
            if(err) throw err;
            return callback(hash);
        });
    });
 };
 
 const comparePassword = async function(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
        if(err) throw err;
        return callback(isPasswordMatch);
    });
 };

function addCard(data){
    var sql = `INSERT INTO credit_cards 
        (number, expiry_date, security_num, active) 
        VALUES (${data.number}, ${data.expiry_date}, ${data.security_num}, true)`;
    runQry(sql);
}

exports.addUser = (data) => {
    const insert = (pswd) => {
        var sql = `INSERT INTO users 
        (f_name, l_name, email, phone, active, password) 
        VALUES 
        (
            '${data.f_name}', 
            '${data.l_name}', 
            '${data.email}', 
            '${data.phone}', true, 
            '${pswd}'
        )`;
        runQry(sql);
    }
    cryptPassword(data.pswd, insert);   
}

function signOutCard(data){
    var sql = `INSERT INTO sign_out
        (card_id, user_id, date, expected_return) 
        VALUES (${data.card_id}, ${data.user_id}, ${data.date}, ${data.expected_return})`;
    runQry(sql);
}

function deleteCard(data){
    var sql = `DELETE FROM credit_cards 
        WHERE number=${data.number} AND security_num=${data.security_num}`;
    runQry(sql);
}

function deleteUser(data){
    var sql = `DELETE FROM users
        WHERE f_name=${data.f_name} AND email=${data.email}`;
    runQry(sql);
}

function returnCard(data){
    var sql = `SELECT expected_return FROM sign_out 
    WHERE card_id=${data.card_id} AND user_id=${data.user_id}`

    con.query(sql, (err, returnData, fields) => {
        if(err) throw err;

        // check date before after

        sql = `UPDATE sign_out 
        SET actual_return=${data.actual_return}, returned_on_time=true
        WHERE card_id=${data.card_id} AND user_id=${data.user_id}`;

        runQry(sql);
    });
}

function runQry(sql){
    con.query(sql, (err, status) => {
        if(err) throw err;
    });
}

exports.authorize = (req, res) => {
    var sql = `SELECT password FROM users WHERE email='${req.session.email}'`
    con.query(sql, (err, data, fields) => {
        if(data[0] === undefined || data.length == 0) {
            res.redirect('/');
            return;
        }
        if(err) throw err;
        return comparePassword(req.session.pswd, data[0].password, (bool) => {
            console.log(bool);
            if(!bool) {
                res.redirect('/');
                return;
            }
            res.redirect('main');
        });
    });
}