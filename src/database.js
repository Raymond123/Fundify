var mysql = require('mysql');

var con = mysql.createConnection({
    host: "db-mysql-tor1-58148-do-user-11220454-0.b.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_TAgrepXtjZVgWsUok-V",
    port: 25060, 
    database: "defaultdb"
});

con.connect(function(err){
    if(err) throw err;
    // console.log("Connected!");
});
module.exports = con;