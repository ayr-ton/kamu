var request = require('request');
var API_ENDPOINT = 'http://localhost:8080';

module.exports = (function () {
  var self = {};
  var bookCopy;
  var jsonPostRequest = request.defaults({ json: true, method: 'POST' });

  function createBookAndAssociatedWithALibrary(libraryUrl, callback) {
    var book = { 'title': 'test book', 'author': 'someone'};

    jsonPostRequest({ uri: API_ENDPOINT + '/books', body: book }, function (err, bookResponse) {
      var copy = {
        'book': bookResponse.headers['location'],
        'library': libraryUrl,
        'status': 'AVAILABLE'
      };
      jsonPostRequest({ uri: API_ENDPOINT + '/copies', body: copy }, function (err, copyResponse) {
        bookCopy = {
          url: copyResponse.headers['location'],
          library: libraryUrl
        };
        callback();
      });
    });
  }

  self.setupLibrary = function (callback) {
    var library = { 'name': 'test', 'slug': 'test' };
    jsonPostRequest({ uri: API_ENDPOINT + '/libraries', body: library }, callback);
  };

  self.cleanUpLibrary = function (libraryUrl, callback) {
    request({ method: 'DELETE', uri: libraryUrl }, callback);
  };

  self.deleteCopy = function (id, callback) {
    request({ method: 'DELETE', uri: API_ENDPOINT + '/copies/' + id }, callback);
  };

  self.setupLibraryWithBook = function (callback) {
    self.setupLibrary(function (err, libraryResponse) {
      createBookAndAssociatedWithALibrary(libraryResponse.headers['location'], callback);
    });
  };

  self.cleanUpLibraryAndBook = function (done) {
    request({ method: 'DELETE', url: bookCopy.url }, function () {
      self.cleanUpLibrary(bookCopy.library, done);
    });
  };

  return self;
}());
