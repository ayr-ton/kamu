'use strict';

describe('BookCtrl routing', function() {
  beforeEach(module('libraryUiApp'));
  
  it('routes / to #index', function() {
    inject(function($route) {
      var rootUrl = $route.routes['/'];
      expect(rootUrl.controller).toBe('BookCtrl');
      expect(rootUrl.templateUrl).toEqual('views/book/index.html');
    });
  });
  
  it('routes /add_book to #add-book', function() {
    inject(function($route) {
      var addBookUrl = $route.routes['/add_book'];
      expect(addBookUrl.controller).toBe('BookCtrl');
      expect(addBookUrl.templateUrl).toEqual('views/book/add-book.html');
    });
  });
});