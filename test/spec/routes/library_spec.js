'use strict';

describe('LibraryCtrl routing', function() {
  beforeEach(module('libraryUiApp'));

  it('routes / to #select_library', inject(function($route){
    var route = $route.routes['/'];

    expect(route.controller).toBe('LibraryCtrl');
    expect(route.templateUrl).toEqual('views/library/index.html');
  }));
});