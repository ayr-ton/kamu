module.exports = (function () {
  var self = {};

  self.books = element.all(by.repeater('copy in copies'));

  function waitForModalAndAcceptIt() {
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000).then(function(){
      browser.switchTo().alert().accept();
    });
  }

  self.borrow = function (book) {
    book.element(by.css('.books-shelf-borrow')).click();

    element(by.css('.modal')).element(by.model('form.user')).sendKeys('john.doe');
    element(by.css('.modal input[type=submit]')).click();

    waitForModalAndAcceptIt();
  };

  self.return = function (book) {
    book.element(by.css('.books-shelf-return')).click();
    element(by.css('.modal input[type=submit]')).click();
    waitForModalAndAcceptIt();
  };

  self.isBorrowed = function (book) {
    return book.element(by.css('.books-shelf-return')).isDisplayed();
  }

  return self;
});
