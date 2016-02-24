'use strict';

describe('BookController', function () {
  var scope, controller, httpBackend, route, apiEndpoint, loanService, toastrLocal,routeParams;
  var libraryIndexPage = 'views/library/index.html';
  var availableQuantity = 0;
  var availableQuantity2 = 0;
  var library, getLibraries, slug;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV, LoanService, toastr) {
    scope = $rootScope;
    route = $route;
    httpBackend = $httpBackend;
    controller = $controller('BookController', {'$scope': scope, '$routeParams': { book: 1, library: 'bh' } } );
    apiEndpoint = ENV.apiEndpoint;
    loanService = LoanService;
    toastrLocal = toastr;

  }));

  describe('#listBooks', function () {
    var searchUrl;
    var copies = {};

    function createDefaultBooks() {
      return {
        '_embedded': {
          'copies': [
            {
              'id' : 1,
              'title': 'Enjoying Fifa with your eyes closed.',
              'numberOfPages': 431,
              'lastLoan': null,
               'status': 'AVAILABLE',
               'reference': 1, 
              '_links': {
                'self': {
                  'href' : 'http://localhost:8080/copies/1{?projection}'
                },
                'library': {
                  'href': 'http://localhost:8080/copies/1/library'
                }
              }
            }
          ]
        }
      };
    }


    function createNewCopy() {
      return {
        'id' : 2,
        'title': 'AA this book should appear first.',
        'numberOfPages': 431,
        'lastLoan': null,
        'status': 'AVAILABLE',
        'reference': 2, 
          '_links': {
            'self': {
              'href' : 'http://localhost:8080/copies/2{?projection}'
            },
          'library': {
            'href': 'http://localhost:8080/copies/2/library'
          }
        }
      };
    }


   function createLibraries(){
    return  {
      '_embedded': {
        'libraries': [
          {
            'name': 'Belo Horizonte',
            'slug': 'bh',
            '_links': {
              'self': {
                'href': 'http://localhost:8080/libraries/1'
              }
            }
          }
        ]
      }
    };
   }
   
  beforeEach(function () {
      copies = createDefaultBooks();
      library= createLibraries();
      slug = 'bh';
      var book = 1;
      searchUrl = apiEndpoint.concat('/copies/search/findDistinctCopiesByLibrary?slug=').concat(slug);
      availableQuantity = apiEndpoint.concat('/copies/search/countByLibrarySlugAndBookIdAndStatus?slug=').concat(slug).concat('&book=').concat(book).concat('&status=').concat('AVAILABLE');
      getLibraries = apiEndpoint.concat('/libraries/search/findBySlug?slug=bh');
      availableQuantity2 = apiEndpoint.concat('/copies/search/countByLibrarySlugAndBookIdAndStatus?slug=').concat(slug).concat('&book=').concat('2').concat('&status=').concat('AVAILABLE');  
  });


  it('sets copies to be empty when copies retrieval fails', function () {
      httpBackend
        .expectGET(searchUrl)
        .respond(500, copies);

        httpBackend.expectGET(libraryIndexPage)
        .respond(200);
     
      scope.listBooks();
      httpBackend.flush();
      expect(scope.copies).toEqual([]);
  });


  it('correctly initializes each copy when copy has no imageUrl', function () {
      httpBackend
        .expectGET(searchUrl)
        .respond(200, copies);

      httpBackend
        .expectGET(libraryIndexPage)
        .respond(200);

     httpBackend
        .expectGET(availableQuantity)
        .respond(200, 1);

      scope.listBooks();

      httpBackend.flush();

      var firstBookFromArray = scope.copies[0];
      expect(firstBookFromArray.title).toEqual('Enjoying Fifa with your eyes closed.');
      expect(firstBookFromArray.imageUrl).toEqual('images/no-image.png');
  });


  it('correctly initializes each copy when copy has imageUrl', function () {
      copies._embedded.copies[0].imageUrl = 'path/to/image';

      httpBackend
        .expectGET(searchUrl)
        .respond(200, copies);

      httpBackend
        .expectGET(libraryIndexPage)
        .respond(200);

      httpBackend
        .expectGET(availableQuantity)
        .respond(200, 1);

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

      httpBackend
        .expectGET(searchUrl)
        .respond(200, copies);

      httpBackend
        .expectGET(libraryIndexPage)
        .respond(200);

      httpBackend
        .expectGET(availableQuantity)
        .respond(200, 1);

      scope.listBooks();

      httpBackend.flush();
      var firstBookFromArray = scope.copies[0];
      expect(firstBookFromArray.lastLoan.user.imageUrl).not.toBeUndefined();
      expect(firstBookFromArray.lastLoan.user.imageUrl).toEqual(imageUrl);

  });


    it ('return the books ordered by title alphabetically', function () {
    
      var newCopy = createNewCopy();
      copies._embedded.copies.push(newCopy);

      httpBackend.expectGET(searchUrl)
        .respond(200, copies);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      httpBackend
        .expectGET(availableQuantity)
        .respond(200, 1);

        httpBackend
        .expectGET(availableQuantity2)
        .respond(200, 1);

      scope.listBooks();

      httpBackend.flush();

      var firstBookTitle = scope.copies[1].title;
      var secondBookTitle = scope.copies[0].title;

      expect(firstBookTitle).toEqual('AA this book should appear first.');
      expect(secondBookTitle).toEqual('Enjoying Fifa with your eyes closed.');
    });
  });
});
