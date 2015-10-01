describe('Add Book Controller', function () {
  var scope, controller, httpBackend, route, apiEndpoint, loanService, toastrLocal;
  var libraryIndexPage = 'views/library/index.html';

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $route, ENV, LoanService, toastr) {
    scope = $rootScope;
    route = $route;
    httpBackend = $httpBackend;
    controller = $controller('AddBookController', {'$scope': scope});
    apiEndpoint = ENV.apiEndpoint;
    loanService = LoanService;
    toastrLocal = toastr;
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

        expect(scope.formShowable).toBe(true);
        expect(scope.errorShowable).toBe(true);
      });
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

          spyOn(toastrLocal, 'success');
          spyOn(toastrLocal, 'error');

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
          expect(toastrLocal.success).toHaveBeenCalledWith('Book has been added to library successfully.');
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
          expect(toastrLocal.error).toHaveBeenCalledWith('Error occurred while adding How to increase test coverage.');
        }));
      });

      describe('when library is not found', function () {
        it('shows alert when library is not found', inject(function ($translate) {
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
          spyOn(toastrLocal, 'error');

          scope.addBookToLibrary();

          httpBackend.flush();

          expect($translate.instant).toHaveBeenCalledWith('INVALID_LIBRARY_ERROR');
          expect(toastrLocal.error).toHaveBeenCalled();
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

        spyOn(toastrLocal, 'success');
        spyOn(toastrLocal, 'error');

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
        expect(toastrLocal.success).toHaveBeenCalledWith('Book has been added to library successfully.');
        expect(window.location.replace).toHaveBeenCalledWith('/#/library/'.concat(slug));
      });

      it('throws error when atttempt to add copy fails', function () {
        httpBackend
          .expectPOST(addCopyEndpoint)
          .respond(500);

        scope.addBookToLibrary();

        httpBackend.flush();

        expect(scope.addingBook).toBe(false);
        expect(toastrLocal.error).toHaveBeenCalledWith('Error occurred while adding How to increase test coverage.');
      });
    });
  });
});
