var express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , session = require('express-session')
  , auth = require('./auth/passport')
  , routes = require('./routes')
  , config = require('./config')
  , nodeSassMiddleware = require('node-sass-middleware');

var app = express()
  , environment = process.env.NODE_ENV || 'development'
  , APP_DIRECTORY =  config.isDevelopment() ? 'app' : 'dist';

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, APP_DIRECTORY));
app.set('view engine', 'html');

app.use(logger('dev'));
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

if (config.isDevelopment()) {
  app.use(nodeSassMiddleware({
    src: path.join(__dirname, APP_DIRECTORY, 'styles'),
    debug: true,
    response: true,
    prefix:  '/styles'
  }));
}

app.use(routes);

app.use(express.static(path.join(__dirname, APP_DIRECTORY)));
if (environment !== 'production') {
  app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
}

//ERROR HANDLING
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (config.isDevelopment() ? err : {})
  });
});

module.exports = app;
