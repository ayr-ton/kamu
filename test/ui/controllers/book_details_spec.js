describe('Book Details Controller', function () {
  var scope, controller, httpBackend, apiEndpoint;
  var copy, libraries, waitingLists;
  beforeEach(module('libraryUiApp'));

  function createCopy(){
    return {
      'id': 1,
      'description':'An extremely pragmatic method for writing better code from the start, and ultimately producing more robust applications.',
      'isbn': 9780132350884,
      'title': 'Clean Code',
      'author': 'Robert C. Martin',
      'imageUrl': null,
      'subtitle': 'A Handbook of Agile Software Craftsmanship',
      'publisher': 'Pearson Education',
      'publicationDate': null,
      'numberOfPages': 431,
      'lastLoan': null,
      'status': 'AVAILABLE',
      'reference': 1
    };

  }


  function createLibraries(){
    return  {
        '_embedded': {
          'libraries': [
            {
              'name': 'Belo Horizonte',
              'slug': 'BH',
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

  function createWaitingLists(){
    return {
        '_embedded' : {
      'waitingLists' : [ {
        'startDate' : '2016-02-23',
        'endDate' : '',
        '_links' : {
            'self' : {
              'href' : 'http://localhost:8080/waitingLists/1'
            },
            'book' : {
              'href' : 'http://localhost:8080/waitingLists/1/book'
            },
            'library' : {
              'href' : 'http://localhost:8080/waitingLists/1/library'
            },
            'user' : {
              'href' : 'http://localhost:8080/waitingLists/1/user'
            }
        }
      } ]
    }
    };
  }

  function createUsers(){
    return {
      'email': 'john.doe@example.com',
      'name': 'Joha Example',
      '_links': {
          'self': {
            'href': 'http://localhost:8080/users/1'
          }
        }
    };
  }

  function mockBookServiceGetCopy() {
    var copyBookEndpPoint = apiEndpoint.concat('/copies/').concat(copy.id).concat('?projection=copyWithBookInline');
    var getQuantity = apiEndpoint.concat('/copies/search/countByLibrarySlugAndBookId?slug=BH&book=1');
    var getAvailableQuantity = apiEndpoint.concat('/copies/search/countByLibrarySlugAndBookIdAndStatus?slug=BH&book=1&status=AVAILABLE');
    var getPendingLoans = apiEndpoint.concat('/loans/search/findByEndDateIsNullAndCopyLibrarySlugAndCopyBookId?slug=BH&book=1');
    var getLibraries = apiEndpoint.concat('/libraries/search/findBySlug?slug=BH');
    var getWaitingList = apiEndpoint.concat('/waitingLists/search/findByBookAndLibrary?book_id=1&slug=1');
    var getUser= apiEndpoint.concat('/waitingLists/1/user');

    
      httpBackend
      .expectGET(copyBookEndpPoint)
      .respond(200, copy);

      httpBackend
      .expectGET('views/library/index.html')
      .respond(200);

      httpBackend
      .expectGET(getLibraries)
      .respond(200, libraries);

       httpBackend
      .expectGET(getQuantity)
      .respond(200, 3);

       httpBackend
      .expectGET(getAvailableQuantity)
      .respond(200, 2);

       httpBackend
      .expectGET(getPendingLoans)
      .respond(200, 1);

        httpBackend
      .expectGET(getWaitingList)
      .respond(200, waitingLists);

       httpBackend
      .expectGET(getUser)
      .respond(200,usersList);
     
       httpBackend.flush();
 }

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    controller = $controller('BookDetailsController', { '$scope': scope , '$routeParams': { bookId: 1, library: 'BH' } });
    apiEndpoint = ENV.apiEndpoint;

    copy =  createCopy();
    libraries = createLibraries();
    waitingLists = createWaitingLists();
    usersList = createUsers();
    mockBookServiceGetCopy();   
  }));


  it('loads the book data when that controller is initialized', function () {
    expect(scope.currentBook.id).toEqual(1);
    expect(scope.currentBook.title).toEqual('Clean Code');
    expect(scope.currentBook.subtitle).toEqual('A Handbook of Agile Software Craftsmanship');
    expect(scope.currentBook.isbn).toEqual(9780132350884);
  });


  it('The book Clean Code should has 3 copies', function () {        
    var quantity = scope.currentBook.quantity;
    expect(quantity).toEqual(3);
  });

  it('The book Clean Code should has 2 availables copies', function () {   
     var availableQuantity = scope.currentBook.availableQuantity;
     expect(availableQuantity).toEqual(2);
  });


});
