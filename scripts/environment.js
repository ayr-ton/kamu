var fs = require('fs');
var config = require('../config')

var environment, selected, contents;

selected = process.env.NODE_ENV || 'development';
environment = config.current();

contents = "'use strict'; angular.module('config', []).constant('ENV', {name:'env',apiEndpoint:'url'});";

fs.writeFileSync('./app/scripts/config.js', contents.replace(/env/, selected).replace(/url/, environment.apiEndpoint));
