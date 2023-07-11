var express = require('express');
var router = express.Router();
var db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/index', function(req, res, next) {
    var sql='SELECT * FROM credit_cards';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('index', { title: 'Credit Cards', userData: data});
  });
});
module.exports = router;