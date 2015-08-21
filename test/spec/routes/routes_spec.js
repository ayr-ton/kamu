'use strict';


describe('libraryUiApp routing', function() {
  
  var location, route, rootScope;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(
    function(_$location_, _$route_, _$rootScope_) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
    }));

   describe('case insensitive routes', function() {
      beforeEach(inject(
        function($httpBackend) {
          $httpBackend.expectGET('views/book/add-book.html').respond(200);
        }));

      it('should route correctly when route is lower case', function() {
        location.path('/library/quito/add_book');
        rootScope.$digest();

        expect(route.current.controller).toBe('BookCtrl');
      });

      it('should route correctly when route is upper case', function() {
        location.path('/library/quito/ADD_BOOK');
        rootScope.$digest();

        expect(route.current.controller).toBe('BookCtrl');
      });
  });

  describe('library dymanic routes', function() {
    it('correctly identifies library param', function() {
      inject(function($httpBackend) {
        $httpBackend.expectGET('views/book/add-book.html').respond(200);

        location.path('/library/random/add_book');
        rootScope.$digest();

        expect(route.current.pathParams.library).toBe('random');
      });
    });
  });
});