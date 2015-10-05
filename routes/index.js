var request = require('request')
  , auth = require('../auth/passport.js')
  , path = require('path')
  , config = require('../config')
  , router = require('express').Router()
  , tokenGenerator = require('../auth/token-server-api');

var persistUser = function (req, res) {

  var username, email, usersApiEndPoint, apiUser, options, user;

  user = req.user;
  username = user.firstName.concat(' ').concat(user.lastName);
  email = user.nameID;

  usersApiEndPoint = config.current().apiEndpoint + "/users";
  apiUser = { name: username, email: email };
  options = {
    uri: usersApiEndPoint,
    method: 'POST',
    json: apiUser,
    headers: {
      'token': tokenGenerator.generate(email)
    }
  };

  request(options, function (error, response, body) {
    console.log("calling API to persist user " + email);
    if (error === null) {
      if (response.statusCode == 201) {
        console.log("User successfully persisted (Status code 201)");
      } else if (response.statusCode == 409) {
        console.log("User already exists, will not persist (Status code 409)");
      } else {
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


if (process.env.NODE_ENV !== 'production') {
  router.get('/test/login', function (req, res) {
    return res.sendFile(path.join(__dirname, '../test/login.html'));
  });
  router.post('/test/login', auth.authenticate('local', { failureRedirect: '/test/login' }),  persistUser);
}

router.post('/login/callback', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), persistUser);

router.get('/login', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {
  res.redirect('/');
  }
);

router.get('/', auth.protected, function (req, res, next)  {
  var username, email, user;

  user = req.user;
  username = user.firstName.concat(' ').concat(user.lastName);
  email = user.nameID;

  return res.render('index', { name: username, email: email });
});

exports.persistUser = persistUser;
exports.router = router;
