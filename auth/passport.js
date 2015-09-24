var passport = require('passport'),
  SamlStrategy = require('passport-saml').Strategy,
  LocalStrategy = require('passport-local').Strategy,
  allEnvironments = require('./auth-environments.json'),
  config, environment;

var users = [];

environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  config = allEnvironments.local;
} else {
  config = allEnvironments.staging;
}
config.auth.cert = process.env.OKTA_CERT;

function findByEmail(nameID, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.nameID === nameID) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.nameID);
});

passport.deserializeUser(function(id, done) {
  findByEmail(id, function (err, user) {
    done(err, user);
  });
});

if (process.env.NODE_ENV !== 'production') {
  passport.use(new LocalStrategy(function (username, password, done) {
    firstName = username.split(' ')[0];
    lastName  = username.split(' ')[1];

    var user = { firstName: firstName, lastName: lastName, nameID: username.replace(/ /, '.').concat('@thoughtworks.com') };

    function byEmail(current) { return current.nameID == user.nameID; }

    if (users.filter(byEmail).length == 0) {
      users.push(user);
    }

    return done(null, user);
  }));
};

passport.use(new SamlStrategy(
  {
    issuer: config.auth.issuer,
  	path: config.auth.path,
    entryPoint: config.auth.entryPoint,
    cert: config.auth.cert
  },
  function(profile, done) {
    if (!profile.nameID) {
      return done(new Error("No email found"), null);
    }
    process.nextTick(function () {
      findByEmail(profile.nameID, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          users.push(profile);
          return done(null, profile);
        }
        return done(null, user);
      })
    });
  }
));

passport.protected = function protected(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports = module.exports = passport;
