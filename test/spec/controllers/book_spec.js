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
});