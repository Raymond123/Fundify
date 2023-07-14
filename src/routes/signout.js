var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/', function(req, res, next) {
    var sql=`SELECT 
        user_id,
        card_id,
        date, 
        expected_return,
        actual_return,
        returned_on_time FROM sign_out`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.status(200).send(data);
    });
});
module.exports = router;