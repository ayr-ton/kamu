'use strict';

var config = require('../../config.js');

module.exports = function () {
  var self = {};

  function form() { return browser.driver.findElement(by.css('form')); }
  function username() { return form().findElement(by.id('username')); }
  function password() { return form().findElement(by.id('password')); }

  self.login = function (name) {
    var appEndpoint = config.current().appEndpoint;
    browser.ignoreSynchronization = true;
    browser.get(appEndpoint + '/test/login');

    username().sendKeys(name);
    password().sendKeys('any');
    form().submit();

    browser.ignoreSynchronization = false;
  };

  return self;
};
