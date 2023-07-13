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
        VALUES (true)`;
    runQry(sql);
}

function addUser(data){
    var sql = `INSERT INTO users 
        (f_name, l_name, email, phone, active) 
        VALUES (true)`;
    runQry(sql);
}

function signOutCard(data){
    var sql = `INSERT INTO sign_out
        (card_id, user_id, date, expected_return) 
        VALUES ()`;
    runQry(sql);
}

function deleteCard(data){
    var sql = `DELETE FROM credit_cards 
        WHERE number=12 AND security_num=123`;
    runQry(sql);
}

function deleteUser(data){
    var sql = `DELETE FROM users
        WHERE f_name=name AND email=email`;
    runQry(sql);
}

function returnCard(data){
    

    var sql = `UPDATE sign_out 
        SET actual_return=date, returned_on_time=true
        WHERE card_id=id AND user_id=id`;
    runQry(sql);
}

function runQry(sql){
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}