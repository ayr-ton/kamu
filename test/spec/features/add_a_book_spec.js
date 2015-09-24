var LibrarySelect, Login;

LibrarySelect = require('../../page_objects/library_select.js');
Login = require('../../page_objects/login.js');

describe('a user that wants to add a book', function () {
  var librarySelect, login, bookList, addBook, JAVASCRIPT_GOOD_PARTS_ISBN;

  beforeEach(function () {
    login = new Login();
    librarySelect = new LibrarySelect();
    login.login('John Doe');
    JAVASCRIPT_GOOD_PARTS_ISBN = '9780596554873';
  });

  it('can add the book to the library', function () {
    bookList = librarySelect.visit().select('Belo Horizonte');

    bookList.addBookWithISBN(JAVASCRIPT_GOOD_PARTS_ISBN);

    expect(bookList.books.count()).toBe(3);
  });
});
