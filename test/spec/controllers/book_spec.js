'use strict';

describe('BookController', function () {
  var scope, controller, httpBackend, route, apiEndpoint, loanService, toastrLocal;
  var libraryIndexPage = 'views/library/index.html';

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV, LoanService, toastr) {
    scope = $rootScope;
    route = $route;
    httpBackend = $httpBackend;
    controller = $controller('BookController', {'$scope': scope});
    apiEndpoint = ENV.apiEndpoint;
    loanService = LoanService;
    toastrLocal = toastr;
  }));

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
      scope.library = slug;
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
});
