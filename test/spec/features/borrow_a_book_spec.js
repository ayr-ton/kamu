var LibrarySelect, Login;

LibrarySelect = require('../../page_objects/library_select.js');
Login = require('../../page_objects/login.js');

describe('a user browsing the library', function () {
  var librarySelect, bookList, login;

  beforeEach(function () {
    login = new Login();
    login.login('John Doe');
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
