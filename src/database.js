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

exports.addCard = (data) => {
    var sql = `INSERT INTO credit_cards (number, expiry_date, security_num, active) VALUES (${data.number}, '${data.expiry}', ${data.sec_num}, true)`;
    runQry(sql);
}

exports.addUser = (data, res) => {
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
        res.redirect('main');
    }
    cryptPassword(data.pswd, insert);   
}

exports.signOutCard = (data) => {
    var sql = `INSERT INTO sign_out (card_id, user_id, date, expected_return) VALUES (${data.card_id}, ${data.user_id}, '${data.date}', '${data.expected_return}')`;

    var sql2 = `UPDATE credit_cards SET signed_out=1 WHERE card_id=${data.card_id}`;
    runQry(sql);
    runQry(sql2);
}

exports.deleteCard = (data) => {
    var sql = `UPDATE credit_cards SET active=0 WHERE number=${data.number} AND security_num=${data.security_num}`;
    runQry(sql);
}

exports.deleteUser = (data) => {
    var sql = `UPDATE users SET active=0 WHERE f_name='${data.f_name}' AND email='${data.email}'`;
    runQry(sql);
}

exports.returnCard = (data) => {
    sql = `UPDATE sign_out SET actual_return='${data.actual_return}', returned_on_time=${data.status} WHERE sign_out_id=${data.sign_out_id}`;

    var sql2 = `UPDATE credit_cards SET signed_out=0 WHERE card_id=${data.card_id}`;

    runQry(sql);
    runQry(sql2);
}

function runQry(sql){
    con.query(sql, (err, status) => {
        if(err) throw err;
        // console.log(status);
    });
}

exports.authorize = (req, res) => {
    var sql = `SELECT * FROM users WHERE email='${req.session.email}'`
    con.query(sql, (err, data, fields) => {
        if(data[0] === undefined || data.length == 0) {
            res.redirect('/');
            return;
        }
        if(err) throw err;
        return comparePassword(req.session.pswd, data[0].password, (bool) => {
            if(!bool) {
                res.redirect('/');
                return;
            }
            req.session.user_id = data[0].user_id;
            res.redirect('main');
        });
    });
}