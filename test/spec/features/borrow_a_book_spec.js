var LibrarySelect, Login, request;

request = require('request');

LibrarySelect = require('../../page_objects/library_select.js');
Login = require('../../page_objects/login.js');

describe('a user browsing the library', function () {
  var librarySelect, bookList, login, bookCopy;

  var API_ENDPOINT = 'http://localhost:8080';

  function setupLibraryWithBook(done) {
    var library = { "name": "test", "slug": "test" };
    var book = { "title": "test book", "author": "someone"};
    var jsonPostRequest = request.defaults({ json: true, method: 'POST' });

    jsonPostRequest({ uri: API_ENDPOINT + '/libraries', body: library }, function (err, libraryResponse) {
      jsonPostRequest({ uri: API_ENDPOINT + '/books', body: book }, function (err, bookResponse) {
        copy = {
          'book': bookResponse.headers['location'],
          'library': libraryResponse.headers['location'],
          'status': 'AVAILABLE'
        };
        jsonPostRequest({ uri: API_ENDPOINT + '/copies', body: copy }, function (err, copyResponse) {
          bookCopy = {
            url: copyResponse.headers['location'],
            library: libraryResponse.headers['location']
          };
          done();
        });
      });
    });
  }

  function cleanUpLibraryAndBook(done) {
    request({ method: 'DELETE', url: bookCopy.url }, function () {
      request({ method: 'DELETE', url: bookCopy.library }, function () {
        done();
      });
    });
  }

  beforeEach(function (done) {
    login = new Login();
    login.login('John Doe');
    librarySelect = new LibrarySelect();
    setupLibraryWithBook(done);
  });

  afterEach(function (done) {
    cleanUpLibraryAndBook(done);
  });

  it('should be able to borrow a book', function () {
    bookList = librarySelect.visit().select('test');

    var book = bookList.books.first();

    bookList.borrow(book);

    expect(bookList.isBorrowed(book)).toBe(true);
  });
});
