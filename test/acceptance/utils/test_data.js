'use strict';

var request = require('request');
var config = require('../../../config.js');

var API_ENDPOINT = config.current().apiEndpoint;

module.exports = (function () {
  var self = {};
  var jsonPostRequest = request.defaults({ json: true, method: 'POST' });

  self.setupLibrary = function (callback) {
      jsonPostRequest({ uri: API_ENDPOINT + '/libraries', body: { 'name': 'test', 'slug': 'test' } }, callback);
  };

  self.cleanUpLibrary = function (callback) {
    request({ method: 'GET', url: API_ENDPOINT + '/libraries/search/findBySlug?slug=test', json:true }, function (req, response, body) {
      if (body._embedded && body._embedded.libraries && body._embedded.libraries.length > 0) {
        request({ method: 'DELETE', uri: body._embedded.libraries[0]._links.self.href }, callback);
      } else {
        callback();
      }
    });
  };

  self.deleteCopy = function (id, callback) {
    request({ method: 'DELETE', uri: API_ENDPOINT + '/copies/' + id }, callback);
  };

  self.setupBook = function (libraryUrl, callback) {
    var book = { 'title': 'test book', 'author': 'someone' };

    jsonPostRequest({ uri: API_ENDPOINT + '/books', body: book }, function (err, bookResponse) {
      var copy = {
        'book': bookResponse.headers.location,
        'library': libraryUrl,
        'status': 'AVAILABLE'
      };
      jsonPostRequest({ uri: API_ENDPOINT + '/copies', body: copy }, callback);
    });
  };

  self.cleanUpCopies = function (callback) {
    request({ method: 'GET', url: API_ENDPOINT + '/copies', json: true}, function (err, response, body) {
      if (body._embedded && body._embedded.copies && body._embedded.copies.length > 0) {
        var testBooks = body._embedded.copies.filter(function (copy) { return copy.title === 'test book'; });
        if (testBooks.length > 0) {
          self.deleteCopy(testBooks[0].id, callback);
        } else {
          callback();
        }
      } else {
        callback();
      }
    });
  };

  return self;
}());
