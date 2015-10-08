module.exports = (function () {
  var self = {};

  var config = {
    environments: {
      dist:        { apiEndpoint: 'http://localhost:8080', appEndpoint: 'http://localhost:9000' },
    	development: { apiEndpoint: 'http://localhost:8080', appEndpoint: 'http://localhost:9000' },
    	staging:     { apiEndpoint: 'http://staging-twlib-api.herokuapp.com', appEndpoint: 'http://kamu-staging.corporate.thoughtworks.com' },
    	production:  { apiEndpoint: 'http://twlib-api.herokuapp.com', appEndpoint: 'http://kamu.corporate.thoughtworks.com' }
    }
  };

  function env() {
    var env = process.env.NODE_ENV || 'development';
    if (env === 'test') {
      env = 'development';
    }
    return env;
  }

  self.current = function () {
    return config.environments[env()];
  };

  self.isDevelopment = function () {
    return env() === 'development';
  };

  return self;
}());
