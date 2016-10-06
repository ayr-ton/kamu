module.exports = (function () {
  var self = {};

  var config = {
    environments: {
      dist:        { apiEndpoint: 'http://localhost:8080', appEndpoint: 'http://localhost:9000' },
    	development: { apiEndpoint: 'http://localhost:8080', appEndpoint: 'http://localhost:9000' },
        staging:     { apiEndpoint: 'https://staging-kamu-api.herokuapp.com', appEndpoint: 'https://staging-kamu-ui.herokuapp.com' },
        production:  { apiEndpoint: 'https://kamu-api.herokuapp.com', appEndpoint: 'https://kamu-ui.herokuapp.com' }
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
