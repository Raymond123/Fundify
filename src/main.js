var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var cardsRouter = require('../src/routes/cards');
var userRouter = require('../src/routes/users');
var signOutRouter = require('../src/routes/signout');
var path = require('path');

const { authorize, addUser } = require('../src/database');
const port = 8090;

var app = express();

app.use(express.static(path.join(__dirname, '../')));
app.set('views', path.join(__dirname, '../www'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

// Routes
app.use('/get/cards', cardsRouter);
app.use('/get/users', userRouter);
app.use('/get/signout', signOutRouter);
app.use(session({secret: "Your secret key"}));

// HTTP Requests
app.get('/main', (req, res) => {
  res.render('../www/index.ejs');
});

app.get('/auth', authorize, (req, res) => {

});

app.get('/', (req, res) => {
  res.render('../www/login.ejs');
});

app.post('/new_card', (req, res) => {
  if(res.statusCode != 200) console.log(res.statusCode);
  console.log(req.body);

  // redirects back to main page to comply with POST/redirect pattern
  res.redirect('main');
})

app.post('/new_user', (req, res) => {
  if(res.statusCode != 200) console.log(res.statusCode);

  addUser(req.body);
  // redirects back to main page to comply with POST/redirect pattern
  res.redirect('main');
})

app.post('/login', (req, res) => {
  var data = req.body;
  req.session.email = data.email;
  req.session.pswd = data.password;
  res.redirect('auth');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}..`)
});