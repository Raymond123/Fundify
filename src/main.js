var express = require('express');
var common = require('../src/common');
var bodyparser = require('body-parser');
var cardsRouter = require('../src/routes/cards');
var userRouter = require('../src/routes/users');
var signOutRouter = require('../src/routes/signout');
var path = require('path');

const port = 8090;

var app = express();

app.use(express.static(path.join(__dirname, '../')));
app.set('views', path.join(__dirname, '../www'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use('/get/cards', cardsRouter);
app.use('/get/users', userRouter);
app.use('/get/signout', signOutRouter);
app.get('/main', (req, res) => {
  res.render('../www/index.ejs');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}..`)
});