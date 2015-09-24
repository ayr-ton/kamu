var AddBook = require('./add_book.js');

module.exports = (function () {
  var self = {};

  self.books = element.all(by.repeater('copy in copies'));

  function waitForModalAndAcceptIt() {
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000).then(function(){
      browser.switchTo().alert().accept();
    });
  }

  self.addBookWithISBN = function (isbn) {
    addBook = self.clickAddBook();

    addBook.fillISBN(isbn);
    addBook.search.click();
    addBook.add.click();

    waitForModalAndAcceptIt();
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
  };

  self.clickAddBook = function () {
    element(by.css('.main-nav-add-book')).click();
    return new AddBook();
  };

  return self;
});
