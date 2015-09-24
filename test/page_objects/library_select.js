var BookList = require('./book_list.js');

module.exports = function () {
  var self = {};

  self.visit = function () {
    browser.get('http://localhost:9000');
    return self;
  }

  self.select = function (name) {
    var bookList;

    function byName(library) {
      return library.getText().then(function (libraryName) { return libraryName.toLowerCase() == name.toLowerCase(); });
    }

    browser.driver.isElementPresent(by.css('.intro-window')).then(function () {
      element.all(by.repeater('library in libraries')).filter(byName).get(0).click();
    });

    return new BookList();
  };

  return self;
};
