module.exports = (function () {
  var self = {};

  self.search = element(by.css('.isbn-search > input[type=submit]'));
  self.add = element(by.css('.main-container-window-divider > input[type=submit]'));

  self.fillISBN = function (isbn) {
    var search = element(by.css('input#isbn-search'))
    search.click('')
    search.sendKeys(isbn);
  };

  return self;
});
