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
    var copies = {};

    function createDefaultBooks() {
      return {
        '_embedded': {
          'copies': [
            {
              'id' : 1,
              'title': 'Enjoying Fifa with your eyes closed.',
              '_links': {
                'self': {
                  'href' : 'http://localhost:8080/copies/1{?projection}'
                }
              }
            }
          ]
        }
      };
    }
    
    beforeEach(function () {
      scope.library = slug;
      copies = createDefaultBooks();
      searchUrl = apiEndpoint.concat('/copies/search/findCopiesByLibrarySlug?slug=').concat(slug);
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
        .respond(200, copies);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      var firstBookFromArray = scope.copies[0];
      expect(firstBookFromArray.title).toEqual('Enjoying Fifa with your eyes closed.');
      expect(firstBookFromArray.imageUrl).toEqual('images/no-image.png');
    });

    it('correctly initializes each copy when copy has imageUrl', function () {
      copies._embedded.copies[0].imageUrl = 'path/to/image';

      httpBackend.expectGET(searchUrl)
        .respond(200, copies);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      var firstBookFromArray = scope.copies[0];
      expect(firstBookFromArray.title).toEqual('Enjoying Fifa with your eyes closed.');
      expect(firstBookFromArray.imageUrl).toEqual('path/to/image');
    });

    it('check correct user image url that has borrowed the book', function () {

      var imageUrl =  'http://www.gravatar.com/avatar/5c710e48e871d4d4c2a66f7b69a19150';

      var lastLoan = {
        'id': 1,
        'email': 'tuliolucas.silva@gmail.com'
      };

      copies._embedded.copies[0].lastLoan = lastLoan;

      httpBackend.expectGET(searchUrl)
        .respond(200, copies);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();
      var firstBookFromArray = scope.copies[0];
      expect(firstBookFromArray.lastLoan.user.imageUrl).not.toBeUndefined();
      expect(firstBookFromArray.lastLoan.user.imageUrl).toEqual(imageUrl);

    });

    it ('return the books ordered by title alphabetically', function () {

      var newCopy = {
        'id' : 2,
        'title': 'AA this book should appear first.',
        '_links': {
          'self': {
            'href' : 'http://localhost:8080/copies/2{?projection}'
          }
        }
      };
      copies._embedded.copies.push(newCopy);

      httpBackend.expectGET(searchUrl)
        .respond(200, copies);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      var firstBookTitle = scope.copies[0].title;
      var secondBookTitle = scope.copies[1].title;

      expect(firstBookTitle).toEqual('AA this book should appear first.');
      expect(secondBookTitle).toEqual('Enjoying Fifa with your eyes closed.');
    });
  });
});
