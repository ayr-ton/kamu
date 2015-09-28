var request = require('request');
var API_ENDPOINT = 'http://localhost:8080';

module.exports = (function () {
  var self = {};
  var bookCopy, libraryUrl;
  var jsonPostRequest = request.defaults({ json: true, method: 'POST' });

  self.setupLibrary = function (callback) {
    var library = { 'name': 'test', 'slug': 'test' };
    jsonPostRequest({ uri: API_ENDPOINT + '/libraries', body: library }, function (err, libraryResponse) {
      libraryUrl = libraryResponse.headers['location'];
      callback();
    });
  };

  self.cleanUpLibrary = function (callback) {
    request({ method: 'DELETE', url: libraryUrl }, function () {
      callback();
    });
  };

  self.deleteCopy = function (id, callback) {
    request({ method: 'DELETE', url: API_ENDPOINT + '/copies/' + id }, function () {
      callback();
    });
  };

  self.setupLibraryWithBook = function (done) {
    var library = { 'name': 'test', 'slug': 'test' };
    var book = { 'title': 'test book', 'author': 'someone'};

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
  };

  self.cleanUpLibraryAndBook = function (done) {
    request({ method: 'DELETE', url: bookCopy.url }, function () {
      request({ method: 'DELETE', url: bookCopy.library }, function () {
        done();
      });
    });
  };

  return self;
}());
