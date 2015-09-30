describe('Book Details Controller', function () {
  var scope, controller, httpBackend, route, apiEndpoint;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV) {
    scope = $rootScope;
    route = $route;
    httpBackend = $httpBackend;
    controller = $controller('BookDetailsController', { '$scope': scope });
    apiEndpoint = ENV.apiEndpoint;
  }));

  describe('#loadAndReloadBookDetails', function(){
    var mockedBook = {
       "id":1,
       "title":"Clean Code",
       "author":"Robert C. Martin",
       "subtitle":"A Handbook of Agile Software Craftsmanship",
       "description":"An extremely pragmatic method for writing better code from the start, and ultimately producing more robust applications.",
       "isbn":9780132350884,
       "publisher":"Pearson Education",
       "publicationDate":"2009",
       "numberOfPages":431,
       "reference":1,
       "_links":{
          "self":{
             "href":"http://localhost:8080/books/1"
          }
       }
    };

    it('successfully opens an existing copy that is not borrowed', function () {
      var copy = {};
      copy.id = 1;

      var copyBookEndpPoint = apiEndpoint.concat('/copies/').concat(copy.id).concat('?projection=copyWithBookInline');

      httpBackend
        .expectGET(copyBookEndpPoint)
        .respond(200, mockedBook);

        httpBackend
        .expectGET("views/library/index.html")
        .respond(200);


      scope.loadBookDetails(copy);

      httpBackend.flush();

      expect(scope.currentBook.id).toEqual(1);
      expect(scope.currentBook.title).toEqual('Clean Code');
      expect(scope.currentBook.subtitle).toEqual('A Handbook of Agile Software Craftsmanship');
      expect(scope.currentBook.isbn).toEqual(9780132350884);

    });

    it('successfully loads an existing copy that is not borrowed', function(){

      var copyReference = 1;

      var copyBookEndpPoint = apiEndpoint.concat('/copies/').concat(copyReference).concat('?projection=copyWithBookInline');


      httpBackend
        .expectGET(copyBookEndpPoint)
        .respond(200, mockedBook);

        httpBackend
        .expectGET("views/library/index.html")
        .respond(200);


      scope.reloadBookDetails(copyReference);

      httpBackend.flush();

      expect(scope.currentBook.id).toEqual(1);
      expect(scope.currentBook.title).toEqual('Clean Code');
      expect(scope.currentBook.subtitle).toEqual('A Handbook of Agile Software Craftsmanship');
      expect(scope.currentBook.isbn).toEqual(9780132350884);

    });

  });
});
