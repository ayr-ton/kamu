'use strict';

describe('Book routing', function () {
  var route;

  beforeEach(module('libraryUiApp'));

  beforeEach(function () {
    inject(function ($route) {
      route = $route;
    })
  });

  it('routes / to #index', function () {
    var rootUrl = route.routes['/library/:library'];
    expect(rootUrl.controller).toBe('BookCtrl');
    expect(rootUrl.templateUrl).toEqual('views/book/index.html');
  });

  it('routes /add_book to #add-book', function () {
    var addBookUrl = route.routes['/library/:library/add_book'];
    expect(addBookUrl.controller).toBe('AddBookController');
    expect(addBookUrl.templateUrl).toEqual('views/book/add-book.html');
  });

  it('routes /library/:library_id/book_deails/:book_id', function () {
    var bookDetailsUrl = route.routes['/library/:library/book_details/:bookId'];
    expect(bookDetailsUrl.controller).toBe('BookDetailsController');
    expect(bookDetailsUrl.templateUrl).toEqual('views/book/book-details.html');
  });
});
