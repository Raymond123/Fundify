var express = require('express');
var router = express.Router();
var { con } = require('../database');

router.get('/', function(req, res, next) {
    var sql=`SELECT 
        user_id,
        card_id,
        date, 
        expected_return,
        actual_return,
        returned_on_time FROM sign_out`;
    con.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.status(200).send(data);
    });
});
module.exports = router;