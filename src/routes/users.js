var express = require('express');
var router = express.Router();
var { con } = require('../database');

router.get('/', function(req, res, next) {
    var sql = `SELECT  
        CONCAT(f_name,' ', l_name) as name, 
        email, 
        phone, 
        active
        FROM users;`;
    con.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.status(200).send(data);
    });
});
module.exports = router;