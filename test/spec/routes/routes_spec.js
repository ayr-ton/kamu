'use strict';

describe('libraryUIApp routing', function() {
  
  var location, route, rootScope;

  beforeEach(module('libraryUiApp'));


  beforeEach(inject(
    function( _$location_, _$route_, _$rootScope_ ) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
    }));

   describe('case insensitive routes', function() {
      beforeEach(inject(
        function($httpBackend) {
            $httpBackend.expectGET('views/book/add-book.html')
            .respond(200);
        }));

      it('should route correctly when route is lower case', function() {
          location.path('/add_book');
          rootScope.$digest();

          expect(route.current.controller).toBe('BookCtrl');
      });

      it('should route correctly when route is upper case', function() {
          location.path('/ADD_BOOK');
          rootScope.$digest();

          expect(route.current.controller).toBe('BookCtrl');
      });
  });    
});