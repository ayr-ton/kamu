var fs = require('fs');
var config = require('../config')

var environments, environment, selected, contents;

environemnts = config.environments;

selected = process.env.NODE_ENV || 'development';
environment = environemnts[selected];

contents = "'use strict'; angular.module('config', []).constant('ENV', {name:'env',apiEndpoint:'url'});";

fs.writeFileSync('./app/scripts/config.js', contents.replace(/env/, selected).replace(/url/, environment.apiEndpoint));
