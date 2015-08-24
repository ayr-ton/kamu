'use strict';


describe('libraryUiApp routing', function() {
  
  var location, route, rootScope, httpBackend;
  
  var cookieKey = 'libraries';
  var searchContextPath = '/libraries/search/findBySlug?slug=';

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(
    function(_$location_, _$route_, _$rootScope_, _$httpBackend_) {
      route = _$route_;
      rootScope = _$rootScope_;
      location = _$location_;
      httpBackend = _$httpBackend_;
    }));

   describe('case insensitive routes', function() {
      var library = 'somelibrary';

      beforeEach(inject(function($cookies, ENV) {
        httpBackend.expectGET('views/book/add-book.html').respond(200)
        httpBackend.when('GET', ENV.apiEndpoint + searchContextPath + library).respond(200, library);
      }));

      it('should route correctly when route is lower case', function() {
        location.path('/library/' + library + '/add_book');
        rootScope.$digest();

        expect(route.current.controller).toBe('BookCtrl');
      });

      it('should route correctly when route is upper case', function() {
        location.path('/liBRary/' + library + '/ADD_BOOK');
        rootScope.$digest();

        expect(route.current.controller).toBe('BookCtrl');
      });
  });

  describe('library dymanic routes', function() {
    it('correctly identifies library param', inject(function(ENV) {
      var library = 'random';

      httpBackend.expectGET(ENV.apiEndpoint + searchContextPath + library).respond(200, library);
      httpBackend.expectGET('views/book/add-book.html').respond(200);

      location.path('/library/' + library + '/add_book');
      rootScope.$digest();

      expect(route.current.pathParams.library).toBe(library);
    }));
  });

  describe('routes callback', function() {
    var slug = 'somelibrary';

    var apiEndpoint, cookies;

    beforeEach(inject(function($cookies, ENV) {
      cookies = $cookies;
      cookies.put(cookieKey, undefined);

      route.pathParams = { 'library' : slug }

      location.path(function() {
        return '/library/' + slug;
      });

      apiEndpoint = ENV.apiEndpoint + '/libraries/search/findBySlug?slug=' + slug;
    }));

    it('does not set library cookie when pathParam is undefined', function(){
        route.pathParams = { 'library' : undefined }

        spyOn(cookies, 'put');

        rootScope.$broadcast('$routeChangeStart', route);

        expect(cookies.put).not.toHaveBeenCalledWith(cookieKey);
        expect(cookies.get(cookieKey)).toBe(undefined);
      }
    );

    it('sets library cookie when library does not exist in cookie but exists in backend', function(){
        var library = { '_embedded': { 'libraries': [ { 'slug': slug } ]}};

        httpBackend
          .expectGET(apiEndpoint)
          .respond(200, library);

        httpBackend
          .expectGET('views/library/index.html')
          .respond(200);

        rootScope.$broadcast('$routeChangeStart', route);

        httpBackend.flush();
        
        expect(cookies.get(cookieKey)).toBe(slug);
    });
    
    it('redirects to select library page when library does not exist in cookie and in backend', function(){
        var library = {};

        httpBackend
          .expectGET(apiEndpoint)
          .respond(200, library);

        httpBackend
          .expectGET('views/library/index.html')
          .respond(200, '');
        
        rootScope.$broadcast('$routeChangeStart', route);

        httpBackend.flush();

        expect(cookies.get(cookieKey)).toBe(undefined);
        expect(route.current.originalPath).toBe('/libraries');
    });
  });
});