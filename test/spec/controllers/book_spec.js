'use strict';

describe('BookCtrl', function () {
  var scope, controller, httpBackend, route, apiEndpoint, loanService, toastrLocal;
  var libraryIndexPage = 'views/library/index.html';

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV, LoanService, toastr) {
    scope = $rootScope;
    route = $route;
    httpBackend = $httpBackend;
    controller = $controller('BookCtrl', {'$scope': scope});
    apiEndpoint = ENV.apiEndpoint;
    loanService = LoanService;
    toastrLocal = toastr;
  }));

  describe('#getCurrentLibraryPath', function () {
    it('routes to root when library path param is not set', function () {
      expect(scope.getCurrentLibraryPath()).toBe('#/libraries');
    });

    it('routes to library path when library path param is set', function () {
      route.current = {'pathParams': {'library': 'random'}};

      expect(scope.getCurrentLibraryPath()).toBe('#/library/random');
    });
  });

  describe('#isInsideLibrary', function () {
    it('returns true when current route is defined', function () {
        route.current = {'pathParams': {'library': 'random'}};

        expect(scope.isInsideLibrary()).toBe(true);
      });

    it('returns false when current route is defined', function () {
      expect(scope.isInsideLibrary()).toBe(false);
    });
  });

  describe('#listBooks', function () {
    var searchUrl;
    var slug = 'bh';
    var library = {
      '_embedded': {
        'libraries': [
          {
            '_links': {
              'self': {
                'href': 'link/to/library'
              }
            },
            '_embedded': {
              'copies': [
                {
                  'title': 'Enjoying Fifa with your eyes closed.',
                }
              ]
            }
          }
        ]
      }
    };

    beforeEach(function () {
      route.current = { 'pathParams': { 'library': slug } };
      searchUrl = apiEndpoint.concat('/libraries/search/findBySlug?slug=').concat(slug);
    });

    it('sets copies to be empty when copies retrieval fails', function () {
      httpBackend.expectGET(searchUrl)
        .respond(500);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      expect(scope.copies).toEqual([]);
    });

    it('correctly initializes each copy when copy has no imageUrl', function () {
      httpBackend.expectGET(searchUrl)
        .respond(200, library);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      expect(scope.copies.length).toEqual(1);
      expect(scope.copies[0].title).toEqual('Enjoying Fifa with your eyes closed.');
      expect(scope.copies[0].imageUrl).toEqual('images/no-image.png');
    });

    it('correctly initializes each copy when copy has imageUrl', function () {
      library._embedded.libraries[0]._embedded.copies[0].imageUrl = 'path/to/image';

      httpBackend.expectGET(searchUrl)
        .respond(200, library);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      expect(scope.copies.length).toEqual(1);
      expect(scope.copies[0].title).toEqual('Enjoying Fifa with your eyes closed.');
      expect(scope.copies[0].imageUrl).toEqual('path/to/image');
    });

  it('check correct user image url that has borrowed the book', function () {

      var imageUrl =  'http://www.gravatar.com/avatar/5c710e48e871d4d4c2a66f7b69a19150';

      var lastLoan = {
          "id"    : 1,
          'email': "tuliolucas.silva@gmail.com"
      }

      library._embedded.libraries[0]._embedded.copies[0].lastLoan = lastLoan;

      httpBackend.expectGET(searchUrl)
        .respond(200, library);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      expect(scope.copies[0].lastLoan.user.imageUrl).not.toBeUndefined();
      expect(scope.copies[0].lastLoan.user.imageUrl).toEqual(imageUrl);

    });

  });

  describe('#gotoAddBook', function () {
    it('redirects to add book page for current slug', inject(function ($window) {
      route.current = {'pathParams': {'library': 'quito'}};

      spyOn($window.location, 'assign');

      scope.gotoAddBook();

      expect($window.location.assign).toHaveBeenCalledWith('/#/library/quito/add_book');
    }));
  });

  describe('#returnCopy', function(){
    var lastLoan = { 'id': '1' };
    var copy = { 'id': '21', 'imageUrl': 'path/to/image', 'lastLoan': lastLoan };
    var loan = { 'id': '12', 'email': 'fakeuser@someemail.com', 'copy': copy };

    var ngElementFake = function() {
        return {
          scope: function() {
            return scope;
          }
        };
      };

    it('successfully returns a book', inject(function ($window, Modal) {
      var modal = Modal;

      spyOn(modal, 'reject');
      spyOn(toastrLocal, 'success');
      spyOn(angular, 'element').andCallFake(ngElementFake);

      httpBackend.expectPATCH(apiEndpoint.concat('/loans/12')).respond(200);
      httpBackend.expectGET(libraryIndexPage).respond(200);
      httpBackend.expectGET(apiEndpoint.concat('/copies/').concat(copy.id).concat('?projection=copyWithBookInline')).respond(200, copy);

      scope.returnCopy(copy);

      modal.resolve({ 'loan': loan });

      httpBackend.flush();

      expect(scope.copy).toEqual(copy);
      expect(toastrLocal.success).toHaveBeenCalledWith('Book has returned to library.');
      expect(modal.reject).toHaveBeenCalled();
      expect(scope.copy.imageUrl).toEqual('path/to/image');
    }));

    describe('copy ret failure', function () {
      var codes =
        [{ 'responseCode': 428, 'errorCode': 'HTTP_CODE_428' },
        { 'responseCode': 500, 'errorCode': 'HTTP_CODE_500' }];

      angular.forEach(codes, function(item) {
        it('shows an error', inject(function ($window, $translate, Modal) {
          spyOn(toastrLocal, 'error');
          spyOn($translate, 'instant');
          spyOn(angular, 'element').andCallFake(ngElementFake);

          httpBackend.expectPATCH(apiEndpoint.concat('/loans/12')).respond(item.responseCode);
          httpBackend.expectGET(libraryIndexPage).respond(200);

          scope.returnCopy(copy);

          Modal.resolve({ 'loan': loan });

          httpBackend.flush();

          expect(toastrLocal.error).toHaveBeenCalled();
          expect($translate.instant).toHaveBeenCalledWith(item.errorCode);
          expect(scope.loan).toEqual(lastLoan);
        }));
      });
    });
  });
});
