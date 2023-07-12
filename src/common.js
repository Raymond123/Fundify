const db = require('../src/database');

function addRow(id, data){
    var table = document.getElementById(id);
    var row = table.insertRow(1);
    var i=0;
    data.forEach(element => {
        for(const key in element){
            var col = row.insertCell(i);
            col.innerHTML = element[key];
            i++;
        }
    });
}

function addCard(){
    var sql = `INSERT INTO credit_cards 
        (number, expiry_date, security_num, active) 
        VALUES (true)`;
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}

function addUser(){
    var sql = `INSERT INTO users 
        (f_name, l_name, email, phone, active) 
        VALUES (true)`;
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}

function signOutCard(){
    var sql = `INSERT INTO sign_out
        (card_id, user_id, date, expected_return) 
        VALUES ()`;
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}

function deleteCard(){
    var sql = `DELETE FROM credit_cards 
        WHERE number=12 AND security_num=123`;
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}

function deleteUser(){
    var sql = `DELETE FROM users
        WHERE f_name=name AND email=email`;
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}

function returnCard(){
    

    var sql = `UPDATE sign_out 
        SET actual_return=date, returned_on_time=true
        WHERE card_id=id AND user_id=id`;
    db.query(sql, (err, status) => {
        if(err) throw err;
    });
}