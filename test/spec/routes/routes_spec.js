'use strict';

describe('libraryUIApp routing', function() {
  
  var location, route, rootScope, routeParams;

  beforeEach(module('libraryUiApp'));
  beforeEach(module('ngRoute'));


  beforeEach(inject(
    function(_$location_, _$route_, _$rootScope_, _$routeParams_) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
      routeParams = _$routeParams_;
    }));

   describe('case insensitive routes', function() {
      beforeEach(inject(
        function($httpBackend) {
          $httpBackend.expectGET('views/book/add-book.html')
          .respond(200);
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
    beforeEach(inject(
        function($httpBackend) {
          $httpBackend.expectGET('views/book/add-book.html')
          .respond(200);
        }));

    it('correctly identifies library param', function() {
      inject(function($route) {
        location.path('/library/random/add_book');
        rootScope.$digest();

        expect(route.current.pathParams.library).toBe('random');
      });
    });
  });

  describe('route change events', function() {
     beforeEach(inject(
        function($httpBackend) {
          $httpBackend.expectGET('views/book/add-book.html')
          .respond(200);
        }));

     xit('sets library on root scope when it is not already set', function() {
       inject(function($route, $rootScope, $injector) {
        rootScope = $injector.get('$rootScope');
        location.path('/library/random/add_book');
        rootScope.$digest();

        expect(rootScope.library_slug).toBe('random');
      });
     })

  })

});