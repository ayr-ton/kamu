var AddBook = require('./add_book.js');

module.exports = (function () {
  var self = {};

  self.books = element.all(by.repeater('copy in copies'));

  self.addBookWithISBN = function (isbn) {
    addBook = self.clickAddBook();

    addBook.fillISBN(isbn);
    addBook.search.click();
    addBook.add.click();
  }

  self.borrow = function (book) {
    book.element(by.css('.books-shelf-borrow')).click();
  };

  self.return = function (book) {
    book.element(by.css('.books-shelf-return')).click();
    element(by.css('.modal input[type=submit]')).click();
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
