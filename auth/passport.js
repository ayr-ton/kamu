var passport = require('passport'),
  SamlStrategy = require('passport-saml').Strategy,
  allEnvironments = require('./auth-environments.json'),
  config, environment;

var users = [];

environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  config = allEnvironments.local;
} else {
  config = allEnvironments.staging;
}

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
