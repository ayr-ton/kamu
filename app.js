var express = require('express');
var connect = require('connect');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var auth = require('./auth/passport');
var config = require('./config');

var request = require('request');

var app = express();

var environment = process.env.NODE_ENV || 'development';
var APP_DIRECTORY =  environment === 'development' ? 'app' : 'dist';

app.use(logger('dev'));
app.use(connect.compress());
app.use(session({
  secret: "won't tell because it's secret",
  resave: true,
  saveUninitialized: true
}));

app.use(auth.initialize());
app.use(auth.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, APP_DIRECTORY, 'favicon.ico')));

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, APP_DIRECTORY));
app.set('view engine', 'html');

if (process.env.NODE_ENV !== 'production') {
  app.get('/test/login', function (req, res) {
    return res.sendFile(path.join(__dirname, 'test/login.html'));
  });
  app.post('/test/login', auth.authenticate('local', { failureRedirect: '/test/login' }),  function(req, res) {
    res.redirect('/');
  });
}

app.post('/login/callback', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {

    var username = req.user.firstName.concat(' ').concat(req.user.lastName);
    var email = req.user.nameID;

    var usersApiEndPoint = config.environments[environment].apiEndpoint + "/users";

    var apiUser = { } ;
    apiUser.name = username;
    apiUser.email = email;

    var options = {
      uri: usersApiEndPoint,
      method: 'POST',
      json: apiUser
    };

    request(options, function (error, response, body) {

      console.log("calling API to persist user " + email)

      if(error === null) {

       if(response.statusCode == 201) {

          console.log("User successfully persisted (Status code 201)");
        
        } else if (response.statusCode == 409) {
        
          console.log("User already exists, will not persist (Status code 409)");
        
        } else{
        
          console.log("Internal Error, Status code: " + response.statusCode);

        }

        res.redirect('/');

      } else {
        return res.render('error', {
          message: 'Server error. Maybe API is down?',
          error: error
         });
      }
      
    });

  }
);

app.get('/login', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {

  res.redirect('/');
  }
);

app.get('/', auth.protected, function (req, res, next)  {
  
  var username = req.user.firstName.concat(' ').concat(req.user.lastName);
  var email = req.user.nameID;

  return res.render('index', { name: username, email: email });
});

app.use(express.static(path.join(__dirname, APP_DIRECTORY)));
if (environment !== 'production') {
  app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
