'use strict';

var BookList = require('./book_list.js');
var config = require('../../../config.js');

module.exports = function () {
  var self = {};

  self.visit = function () {
    var appEndpoint = config.current().appEndpoint;
    browser.get(appEndpoint);
    return self;
  };

  self.select = function (name) {

    function byName(library) {
      return library.getText().then(function (libraryName) { return libraryName.toLowerCase() === name.toLowerCase(); });
    }

    browser.driver.isElementPresent(by.css('.intro-window')).then(function () {
      element.all(by.repeater('library in libraries')).filter(byName).get(0).click();
    });

    return new BookList();
  };

  return self;
};
