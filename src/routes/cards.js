var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/', function(req, res, next) {
    var sql='SELECT * FROM credit_cards';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('index', {title: 'data', cardData: data});
    });
});
module.exports = router;