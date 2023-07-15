var express = require('express');
var router = express.Router();
var { con } = require('../database');

router.get('/', function(req, res, next) {
    var sql=`SELECT 
        number, 
        expiry_date,
        active,
        signed_out FROM credit_cards`;
    con.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.status(200).send(data);
    });
});
module.exports = router;