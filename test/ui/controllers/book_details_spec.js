describe('Book Details Controller', function () {
  var scope, controller, httpBackend, apiEndpoint;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    controller = $controller('BookDetailsController', { '$scope': scope, '$routeParams': { bookId: 1 } });
    apiEndpoint = ENV.apiEndpoint;
  }));

  function createBook () {
    return {
       'id':1,
       'title':'Clean Code',
       'lastLoan': null,
       'author':'Robert C. Martin',
       'subtitle':'A Handbook of Agile Software Craftsmanship',
       'description':'An extremely pragmatic method for writing better code from the start, and ultimately producing more robust applications.',
       'isbn':9780132350884,
       'publisher':'Pearson Education',
       'publicationDate':'2009',
       'numberOfPages':431,
       'reference':1,
       '_links':{
          'self':{
             'href':'http://localhost:8080/books/1'
          }
       }
    };
  }

  function mockBookServiceGetCopy(book) {
    var copy = { id: 1 };

    var copyBookEndpPoint = apiEndpoint.concat('/copies/').concat(copy.id).concat('?projection=copyWithBookInline');
    var copyLibraryEndPoint = apiEndpoint.concat('/libraries/search/findBySlug?slug=undefined');
    httpBackend
      .expectGET(copyBookEndpPoint)
      .respond(200, book);

    httpBackend
      .expectGET('views/library/index.html')
      .respond(200);

    httpBackend
      .expectGET(copyLibraryEndPoint)
      .respond(1);

    httpBackend.flush();
  }

  it('loads the book data when that controller is initialized', function () {
    mockBookServiceGetCopy(createBook());

    expect(scope.currentBook.id).toEqual(1);
    expect(scope.currentBook.title).toEqual('Clean Code');
    expect(scope.currentBook.subtitle).toEqual('A Handbook of Agile Software Craftsmanship');
    expect(scope.currentBook.isbn).toEqual(9780132350884);
  });

  it('sets gravatar image url (when the book is borrowed)', function () {
    var book = createBook();
    book.lastLoan = { email: 'john.doe@example.com' };

    mockBookServiceGetCopy(book);

    expect(scope.currentBook.lastLoan.user.imageUrl).toMatch(/gravatar/);
  });
});
