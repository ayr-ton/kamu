'use strict';

describe('LibraryController routing', function () {
  beforeEach(module('libraryUiApp'));

  it('routes /libraries to library selection page', inject(function ($route) {
    var route = $route.routes['/libraries'];

    expect(route.controller).toBe('LibraryController');
    expect(route.templateUrl).toEqual('views/library/index.html');
  }));

  it('routes / to library selection page', inject(function ($route) {
    var route = $route.routes['/'];

    expect(route.controller).toBe('LibraryController');
    expect(route.templateUrl).toEqual('views/library/index.html');
  }));
});
