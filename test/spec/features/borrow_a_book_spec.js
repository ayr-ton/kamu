var LibrarySelect;

LibrarySelect = require('../../page_objects/library_select.js');

describe('a user browsing the library', function () {
  var librarySelect, bookList;

  function login() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:9000/test/login');

    var form = browser.driver.findElement(By.css('form'));
    form.findElement(By.id('username')).sendKeys('John Doe');
    form.findElement(By.id('password')).sendKeys('any');
    form.submit();
    browser.ignoreSynchronization = false;
  }

  beforeEach(function () {
    login();
    librarySelect = new LibrarySelect();
  });

  afterEach(function () {
    bookList = librarySelect.visit().select('Belo Horizonte');
    bookList.return(bookList.books.first());
  });

  it('should be able to borrow a book', function () {
    bookList = librarySelect.visit().select('Belo Horizonte');

    var book = bookList.books.first();

    bookList.borrow(book);

    expect(bookList.isBorrowed(book)).toBe(true);
  });
});
