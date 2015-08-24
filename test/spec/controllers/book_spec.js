'use strict';

describe('BookCtrl', function() {
  var scope, controller;
  
  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    controller = $controller('BookCtrl', { '$scope' : scope });
  }));


  describe('#autoCompleteSearch', function() {
    it('only shows isbn field', inject(function($controller, $rootScope) {
      scope.autoCompleteSearch();

      expect(scope.formShowable).toBe(false);
      expect(scope.errorShowable).toBe(false);
      expect(scope.searchShowable).toBe(true);
      expect(scope.isbnSearch).toBe(true);
    }));
  });

  describe('#findGoogleBooks', function(){
    it('expect book to be empty when criteria is empty', function(){
      scope.searchCriteria = '';

      scope.findGoogleBooks();

      expect(scope.book).toEqual({});
    });
  });

  describe('#getCurrentLibraryPath', function(){
    it('routes to root when library path param is not set', function(){
      expect(scope.getCurrentLibraryPath()).toBe('#/libraries');
    });

    it('routes to library path when library path param is set', inject(function($location, $route){
      var route = $route;

      route.current = { 'pathParams': {'library': 'random'} }

      expect(scope.getCurrentLibraryPath()).toBe('#/library/random');
    }));
  });
});