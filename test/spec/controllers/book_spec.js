'use strict';

describe('BookCtrl', function () {
  var scope, controller, httpBackend, route, apiEndpoint, loanService;
  var libraryIndexPage = 'views/library/index.html';

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV, LoanService) {
    scope = $rootScope;
    route = $route;
    httpBackend = $httpBackend;
    controller = $controller('BookCtrl', {'$scope': scope});
    apiEndpoint = ENV.apiEndpoint;
    loanService = LoanService;
  }));


  describe('#autoCompleteSearch', function () {
    it('only shows isbn field', function () {
      scope.autoCompleteSearch();

      expect(scope.formShowable).toBe(false);
      expect(scope.errorShowable).toBe(false);
      expect(scope.searchShowable).toBe(true);
      expect(scope.isbnSearch).toBe(true);
    });
  });

  describe('#findGoogleBooks', function () {
    it('expects book to be empty when criteria is empty', function () {
      scope.searchCriteria = '';

      scope.findGoogleBooks();

      expect(scope.book).toEqual({});
    });

    it('sets book properties correctly when book exists in library', function () {
      scope.searchCriteria = '985693865986';

      var data = {
        '_embedded': {
          'books': [
            {
              'title': 'How to enjoy pairing',
              'subtitle': 'The francieli-ekow way',
              'authors': ['Francieli', 'Ekow'],
              'imageUrl': null
            }
          ]
        }
      };

      httpBackend
        .expectGET(apiEndpoint.concat('/books/search/findByIsbn?isbn=').concat(scope.searchCriteria))
        .respond(200, data);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.findGoogleBooks();

      httpBackend.flush();

      expect(scope.book.title).toEqual('How to enjoy pairing');
      expect(scope.book.subtitle).toEqual('The francieli-ekow way');
      expect(scope.book.authors).toEqual(['Francieli', 'Ekow']);
      expect(scope.book.imageUrl).toEqual('images\\no-image.png');

      expect(scope.bookExistsInTheLibrary).toBe(true);

      expect(scope.formShowable).toBe(true);
      expect(scope.errorShowable).toBe(false);
    });

    it('toggles error display when library search returns an error', function () {
      scope.searchCriteria = '985693865986';

      httpBackend
        .expectGET(apiEndpoint.concat('/books/search/findByIsbn?isbn=').concat(scope.searchCriteria))
        .respond(500);

      httpBackend.expectGET(libraryIndexPage)
        .respond(200);

      scope.findGoogleBooks();

      httpBackend.flush();

      expect(scope.book).toEqual({});

      expect(scope.formShowable).toBe(false);
      expect(scope.errorShowable).toBe(true);
    });

    describe('when book does not exist in library', function () {
      it('calls google service and setup up book', function () {
        scope.searchCriteria = '985693865986';

        var libraryData = {};
        var googleData = {
          'items': [
            {
              'volumeInfo': {
                'title': 'How to enjoy pairing - 2nd Edition',
                'subtitle': 'The francieli-ekow way',
                'industryIdentifiers': [
                  {
                    'type': 'ISBN_13',
                    'identifier': scope.searchCriteria
                  }
                ]
              }
            }
          ]
        };

        httpBackend
          .expectGET(apiEndpoint.concat('/books/search/findByIsbn?isbn=').concat(scope.searchCriteria))
          .respond(200, libraryData);

        httpBackend.expectGET(libraryIndexPage)
          .respond(200);

        httpBackend
          .expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:'.concat(scope.searchCriteria))
          .respond(200, googleData);

        scope.findGoogleBooks();

        httpBackend.flush();

        expect(scope.book.title).toEqual('How to enjoy pairing - 2nd Edition');
        expect(scope.book.subtitle).toEqual('The francieli-ekow way');
        expect(scope.book.isbn).toEqual('985693865986');

        expect(scope.bookExistsInTheLibrary).toBe(false);

        expect(scope.formShowable).toBe(true);
        expect(scope.errorShowable).toBe(false);
      });

      it('shows error message when no book in found in google', function () {
        scope.searchCriteria = '985693865986';

        var libraryData = {};
        var googleData = {};

        httpBackend
          .expectGET(apiEndpoint.concat('/books/search/findByIsbn?isbn=').concat(scope.searchCriteria))
          .respond(200, libraryData);

        httpBackend.expectGET(libraryIndexPage)
          .respond(200);

        httpBackend
          .expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:'.concat(scope.searchCriteria))
          .respond(200, googleData);

        scope.findGoogleBooks();

        httpBackend.flush();

        expect(scope.book).toEqual({});

        expect(scope.formShowable).toBe(false);
        expect(scope.errorShowable).toBe(true);
      });
    });
  });

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

  describe('#addManually', function () {
    it('sets initializes form elements correctly', function () {
      scope.addManually();

      expect(scope.book).toEqual({});
      expect(scope.searchShowable).toBe(false);
      expect(scope.isbnSearch).toBe(false);
      expect(scope.isGoogleBook).toBe(false);
      expect(scope.formShowable).toBe(true);
      expect(scope.errorShowable).toBe(false);
    });
  });

  describe('#addBookToLibrary', function () {
    describe('when book does not exist', function () {
      describe('when library is found', function () {
        var slug = 'bh';
        var window, library, librarySearchEndpoint, addBookEndpoint, addCopyEndpoint;

        beforeEach(inject(function ($window) {
          route.current = {'pathParams': {'library': 'bh'}};

          window = $window;

          librarySearchEndpoint = apiEndpoint.concat('/libraries/search/findBySlug?slug=').concat(slug);
          addBookEndpoint = apiEndpoint.concat('/books');
          addCopyEndpoint = apiEndpoint.concat('/copies');

          library = {
            '_embedded': {
              'libraries': [
                {
                  '_links': {
                    'self': {
                      'href': 'link/to/library'
                    }
                  }
                }
              ]
            }
          };

          spyOn(window, 'alert');

          scope.book = {'title': 'How to increase test coverage'};
          scope.bookExistsInTheLibrary = false;

          httpBackend
            .expectGET(librarySearchEndpoint)
            .respond(200, library);

          httpBackend.expectGET(libraryIndexPage)
            .respond(200);
        }));

        it('adds book when book does not exist in library', function () {
          spyOn(window.location, 'replace');

          httpBackend
            .expectPOST(addBookEndpoint, scope.book)
            .respond(201);

          httpBackend
            .expectPOST(addCopyEndpoint)
            .respond(201);

          scope.addBookToLibrary();

          httpBackend.flush();

          expect(scope.addingBook).toBe(false);
          expect(window.alert).toHaveBeenCalledWith('Book has been added to library successfully.');
          expect(window.location.replace).toHaveBeenCalledWith('/#/library/'.concat(slug));
        });

        it('throws error when atttempt to add existing book fails', inject(function () {
          httpBackend
            .expectPOST(addBookEndpoint, scope.book)
            .respond(201);

          httpBackend
            .expectPOST(addCopyEndpoint)
            .respond(500);

          scope.addBookToLibrary();

          httpBackend.flush();

          expect(scope.addingBook).toBe(false);
          expect(window.alert).toHaveBeenCalledWith('Error occurred while adding How to increase test coverage.');
        }));
      });

      describe('when library is not found', function () {
        it('shows alert when library is not found', inject(function ($translate, $window) {
          var library = {};
          var librarySearchEndpoint = apiEndpoint.concat('/libraries/search/findBySlug?slug=bh');
          route.current = {'pathParams': {'library': 'bh'}};

          scope.book = {};
          scope.bookExistsInTheLibrary = false;

          httpBackend
            .expectGET(librarySearchEndpoint)
            .respond(200, library);

          httpBackend.expectGET(libraryIndexPage)
            .respond(200);

          spyOn($translate, 'instant');
          spyOn($window, 'alert');

          scope.addBookToLibrary();

          httpBackend.flush();

          expect($translate.instant).toHaveBeenCalledWith('INVALID_LIBRARY_ERROR');
          expect($window.alert).toHaveBeenCalled();
          expect(scope.addingBook).toBe(true);
        }));
      });
    });

    describe('when book already exists', function () {
      var slug = 'bh';
      var library, window, librarySearchEndpoint, addBookEndpoint, addCopyEndpoint;

      beforeEach(inject(function ($window) {
        window = $window;

        librarySearchEndpoint = apiEndpoint.concat('/libraries/search/findBySlug?slug=').concat(slug);
        addBookEndpoint = apiEndpoint.concat('/books');
        addCopyEndpoint = apiEndpoint.concat('/copies');

        library = {
          '_embedded': {
            'libraries': [
              {
                '_links': {
                  'self': {
                    'href': 'link/to/library'
                  }
                }
              }
            ]
          }
        };

        route.current = {'pathParams': {'library': 'bh'}};

        scope.bookExistsInTheLibrary = true;
        scope.book = {
          'title': 'How to increase test coverage',
          '_links': {
            'self': {
              'href': 'link/to/book'
            }
          }
        };

        spyOn(window, 'alert');

        httpBackend
          .expectGET(librarySearchEndpoint)
          .respond(200, library);

        httpBackend.expectGET(libraryIndexPage)
          .respond(200);
      }));

      it('adds copy successfully', function () {
        spyOn(window.location, 'replace');

        httpBackend
          .expectPOST(addCopyEndpoint)
          .respond(200);

        scope.addBookToLibrary();

        httpBackend.flush();

        expect(scope.addingBook).toBe(false);
        expect(window.alert).toHaveBeenCalledWith('Book has been added to library successfully.');
        expect(window.location.replace).toHaveBeenCalledWith('/#/library/'.concat(slug));
      });

      it('throws error when atttempt to add copy fails', function () {
        httpBackend
          .expectPOST(addCopyEndpoint)
          .respond(500);

        scope.addBookToLibrary();

        httpBackend.flush();

        expect(scope.addingBook).toBe(false);
        expect(window.alert).toHaveBeenCalledWith('Error occurred while adding How to increase test coverage.');
      });
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
          "user"  : 
          { 
            'id': '21', 
            'email': "tuliolucas.silva@gmail.com"
        }

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

  describe('#borrowBook', function(){

    var currentUser = 'fakeuser@someemail.com';

    var copy = { 'id': '21', 'imageUrl': 'path/to/image' };
    var loan = {'id': '12', 'email': currentUser, 'copy': copy };

    var copyAfterBorrow = { 'id': '21', 'imageUrl': 'path/to/image', 'lastLoan': loan};

    it('successfully borrows a book', inject(function ($window) {

      $window.sessionStorage.email = currentUser;

      var ngElementFake = function() {
          return {
            scope: function() {
              return scope;
            }
          };
        };

      spyOn(angular, 'element').andCallFake(ngElementFake);
      spyOn(loanService, 'borrowCopy').andCallThrough();

      httpBackend.expectPOST(apiEndpoint.concat('/loans')).respond(200);
      httpBackend.expectGET(libraryIndexPage).respond(200);
      httpBackend.expectGET(apiEndpoint.concat('/copies/').concat(copy.id).concat('?projection=copyWithBookInline')).respond(200, copyAfterBorrow);

      scope.borrowCopy(copy);

      httpBackend.flush();

      expect(loanService.borrowCopy).toHaveBeenCalledWith('21', 'fakeuser@someemail.com');
      expect(scope.copy).toEqual(copyAfterBorrow);
    }));

    describe('copy borrow failure', function () {
      var codes = 
        [{ 'responseCode': 412, 'errorCode': 'HTTP_CODE_412' },
        { 'responseCode': 409, 'errorCode': 'HTTP_CODE_409' },
        { 'responseCode': 500, 'errorCode': 'HTTP_CODE_500' }];

      angular.forEach(codes, function(item) {
        it('shows error message', inject(function  ($window, $translate) {
          spyOn($window, 'alert');
          spyOn($translate, 'instant');

          httpBackend.expectPOST(apiEndpoint.concat('/loans')).respond(item.responseCode);
          httpBackend.expectGET(libraryIndexPage).respond(200);

          scope.borrowCopy(copy);

          httpBackend.flush();

          expect($window.alert).toHaveBeenCalled();
          expect($translate.instant).toHaveBeenCalledWith(item.errorCode);
        }));
      });
    });
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
      spyOn($window, 'alert');
      spyOn(angular, 'element').andCallFake(ngElementFake);

      httpBackend.expectPATCH(apiEndpoint.concat('/loans/12')).respond(200);
      httpBackend.expectGET(libraryIndexPage).respond(200);
      httpBackend.expectGET(apiEndpoint.concat('/copies/').concat(copy.id).concat('?projection=copyWithBookInline')).respond(200, copy);

      scope.returnCopy(copy);

      modal.resolve({ 'loan': loan });

      httpBackend.flush();

      expect(scope.copy).toEqual(copy);
      
      expect($window.alert).toHaveBeenCalledWith('Book has returned to library.');
      expect(modal.reject).toHaveBeenCalled();
      expect(scope.copy.imageUrl).toEqual('path/to/image');
    }));

    describe('copy ret failure', function () {
      var codes = 
        [{ 'responseCode': 428, 'errorCode': 'HTTP_CODE_428' },
        { 'responseCode': 500, 'errorCode': 'HTTP_CODE_500' }];

      angular.forEach(codes, function(item) {
        it('shows an error', inject(function ($window, $translate, Modal) {
          spyOn($window, 'alert');
          spyOn($translate, 'instant');
          spyOn(angular, 'element').andCallFake(ngElementFake);

          httpBackend.expectPATCH(apiEndpoint.concat('/loans/12')).respond(item.responseCode);
          httpBackend.expectGET(libraryIndexPage).respond(200);

          scope.returnCopy(copy);

          Modal.resolve({ 'loan': loan });

          httpBackend.flush();

          expect($window.alert).toHaveBeenCalled();
          expect($translate.instant).toHaveBeenCalledWith(item.errorCode);
          expect(scope.loan).toEqual(lastLoan);
        }));
      });
    });
  });
});