var LibrarySelect, Login;

LibrarySelect = require('../page_objects/library_select.js');
Login = require('../page_objects/login.js');
testData = require('../utils/test_data');

describe('a user that wants to add a book', function () {
  var librarySelect, login, bookList, addBook, JAVASCRIPT_GOOD_PARTS_ISBN;

  beforeEach(function (done) {
    login = new Login();
    librarySelect = new LibrarySelect();
    login.login('John Doe');
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

  it('can add the book to the library', function () {
    bookList = librarySelect.visit().select('test');

    bookList.addBookWithISBN(JAVASCRIPT_GOOD_PARTS_ISBN);

    expect(bookList.books.count()).toBe(1);
  });
});
