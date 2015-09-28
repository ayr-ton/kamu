module.exports = (function () {
  var self = {};

  var config = {
    environments: {
    	development: { apiEndpoint: 'http://localhost:8080', appEndpoint: 'http://localhost:9000' },
    	staging:     { apiEndpoint: 'http://staging-twlib-api.herokuapp.com', appEndpoint: 'http://staging-twlib.herokuapp.com' },
    	production:  { apiEndpoint: 'http://twlib-api.herokuapp.com', appEndpoint: 'http://twlib.herokuapp.com' }
    }
  };

  self.current = function () {
    var env = process.env.NODE_ENV || 'development';
    if (env === 'test') {
      env = 'development';
    }
    return config.environments[env];
  };

  return self;
}());
