var LibrarySelect, Login;

LibrarySelect = require('../page_objects/library_select');
Login = require('../page_objects/login');
testData = require('../utils/test_data');

describe('a user browsing the library', function () {
  var librarySelect, bookList, login, JAVASCRIPT_GOOD_PARTS_ISBN;

  beforeEach(function (done) {
    login = new Login();
    login.login('John Doe');
    librarySelect = new LibrarySelect();
    JAVASCRIPT_GOOD_PARTS_ISBN = '9780596554873';
    testData.setupLibrary(done);
  });

  afterEach(function (done) {
    function byName(name) {
      return function (copy) {
        return copy.element(by.css('.book-shelf-title')).getText(function () {
          return text == name;
        });
      }
    }
    bookList.books.filter(byName('JavaScript: The Good Parts')).get(0).getAttribute('id').then(function (id) {
      var id = id.split('-')[1];

      testData.deleteCopy(id, function () {
        testData.cleanUpLibrary(done);
      });
    });
  });

  it('should be able to borrow a book', function () {
    bookList = librarySelect.visit().select('test');
    bookList.addBookWithISBN(JAVASCRIPT_GOOD_PARTS_ISBN);
    var book = bookList.books.first();

    bookList.borrow(book);

    expect(bookList.isBorrowed(book)).toBe(true);
  });
});
