var express = require('express');
var bodyparser = require('body-parser');
var cardsRouter = require('../src/routes/cards');
var path = require('path');
const cors = require('cors');

const port = 8090;

var app = express();

app.set('views', path.join(__dirname, '../www'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use('/main', cardsRouter);
app.get('/', (req, res) => {
  res.render('../www/index.ejs');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}..`)
});