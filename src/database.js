var mysql = require('mysql');

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
module.exports = con;

function addCard(data){
    var sql = `INSERT INTO credit_cards 
        (number, expiry_date, security_num, active) 
        VALUES (${data.number}, ${data.expiry_date}, ${data.security_num}, true)`;
    runQry(sql);
}

function addUser(data){
    var sql = `INSERT INTO users 
        (f_name, l_name, email, phone, active) 
        VALUES (${data.f_name}, ${data.l_name}, ${data.email}, ${data.phone}, true)`;
    runQry(sql);
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

    db.query(sql, (err, returnData, fields) => {
        if(err) throw err;

        // check date before after

        sql = `UPDATE sign_out 
        SET actual_return=${data.actual_return}, returned_on_time=true
        WHERE card_id=${data.card_id} AND user_id=${data.user_id}`;

        runQry(sql);
    });
}

function runQry(sql){
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}