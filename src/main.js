var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var cardsRouter = require('../src/routes/cards');
var userRouter = require('../src/routes/users');
var signOutRouter = require('../src/routes/signout');
var path = require('path');

const { authorize, addUser, deleteUser, addCard } = require('../src/database');
const port = 8090;

var app = express();

app.use(express.static(path.join(__dirname, '../')));
app.set('views', path.join(__dirname, '../www'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

// Serve the CSS file
app.get('/main/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'styles.css'), { headers: { 'Content-Type': 'text/css' } });
});

app.get('/get/logoStandard', (req, res) => {
  res.sendFile(path.join(__dirname, `../src/LogoFundify.png`));
});

app.get('/get/logoLeft', (req, res) => {
  res.sendFile(path.join(__dirname, `../src/LogoLeft.png`));
});


// Routes
app.use('/get/cards', cardsRouter);
app.use('/get/users', userRouter);
app.use('/get/signout', signOutRouter);
app.use(session({secret: "Your secret key"}));

// HTTP Requests
app.get('/main', (req, res) => {
  res.render('../www/index.ejs');
});

app.get('/auth', authorize);

app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.render('../www/login.ejs');
});

app.get('/user/delete', (req, res) => {
  params = req.query;
  data = {
    f_name: params.name,
    email: params.email
  };
  deleteUser(data);
  res.redirect('../main');
});

app.post('/new_card', (req, res) => {
  if(res.statusCode != 200) console.log(res.statusCode);
  console.log(req.body);

  // redirects back to main page to comply with POST/redirect pattern
  addCard(req.body);
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