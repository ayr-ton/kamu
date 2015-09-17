var fs = require('fs');

var environments, environment, selected, contents;

environemnts = {
  development: { apiEndpoint: 'http://localhost:8080' },
  staging:     { apiEndpoint: 'http://staging-twlib-api.herokuapp.com' },
  qa:          { apiEndpoint: 'http://qa-twlib-api.herokuapp.com' },
  production:  { apiEndpoint: 'http://twlib-api.herokuapp.com' }
};

selected = process.env.NODE_ENV || 'development';
environment = environemnts[selected];

contents = "'use strict'; angular.module('config', []).constant('ENV', {name:'env',apiEndpoint:'url'});";

fs.writeFileSync('./app/scripts/config.js', contents.replace(/env/, selected).replace(/url/, environment.apiEndpoint));
