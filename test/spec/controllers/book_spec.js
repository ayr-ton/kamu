'use strict';

describe('BookCtrl', function() {
  var scope, createController;
  
  beforeEach(module('libraryUiApp'));

  // beforeEach(inject(function (
  //                           $_controller_,
  //                           $rootScope,
  //                           BookService, 
  //                           LoanService, 
  //                           modals, 
  //                           $translate,
  //                           $route,
  //                           $http) {

  //     scope = $rootScope.$new();

  //     createController = function() {
  //         return $_controller_('BookCtrl', {
  //             '$scope': scope,
  //             'BookService': BookService,
  //             'LoanService': LoanService,
  //             'modals': modals,
  //             '$translate': $translate,
  //             '$route': $route,
  //             '$http': $http
  //         });
  //     };

  //     console.log(createController());
  // }));

  describe('#autoCompleteSearch', function() {
    it('only shows isbn field', inject(function($controller, $rootScope) {
      var scope = $rootScope;
      var controller = $controller('BookCtrl', { '$scope' : scope });

      scope.autoCompleteSearch();

      expect(scope.formShowable).toBe(false);
      expect(scope.errorShowable).toBe(false);
      expect(scope.searchShowable).toBe(true);
      expect(scope.isbnSearch).toBe(true);
    }));
  });
});