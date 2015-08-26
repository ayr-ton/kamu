'use strict';

describe('BookCtrl', function () {
  var scope, controller;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope;
    controller = $controller('BookCtrl', {'$scope': scope});
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

    it('sets book properties correctly when book exists in library',
      inject(function ($controller, $httpBackend, ENV) {
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

        $httpBackend
          .expectGET(ENV.apiEndpoint + '/books/search/findByIsbn?isbn=' + scope.searchCriteria)
          .respond(200, data);

        $httpBackend.expectGET('views/library/index.html')
          .respond(200);

        scope.findGoogleBooks();

        $httpBackend.flush();

        expect(scope.book.title).toEqual('How to enjoy pairing');
        expect(scope.book.subtitle).toEqual('The francieli-ekow way');
        expect(scope.book.authors).toEqual(['Francieli', 'Ekow']);
        expect(scope.book.imageUrl).toEqual('images\\no-image.png');

        expect(scope.bookExistsInTheLibrary).toBe(true);

        expect(scope.formShowable).toBe(true);
        expect(scope.errorShowable).toBe(false);
      })
    );

    it('toggles error display when library search returns an error',
      inject(function ($controller, $httpBackend, ENV) {
        scope.searchCriteria = '985693865986';

        $httpBackend
          .expectGET(ENV.apiEndpoint + '/books/search/findByIsbn?isbn=' + scope.searchCriteria)
          .respond(500);

        $httpBackend.expectGET('views/library/index.html')
          .respond(200);

        scope.findGoogleBooks();

        $httpBackend.flush();

        expect(scope.book).toEqual({});

        expect(scope.formShowable).toBe(false);
        expect(scope.errorShowable).toBe(true);
      })
    );

    describe('when book does not exist in library', function () {
      it('calls google service and setup up book',
        inject(function ($controller, $httpBackend, ENV) {
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

          $httpBackend
            .expectGET(ENV.apiEndpoint + '/books/search/findByIsbn?isbn=' + scope.searchCriteria)
            .respond(200, libraryData);

          $httpBackend.expectGET('views/library/index.html')
            .respond(200);

          $httpBackend
            .expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:' + scope.searchCriteria)
            .respond(200, googleData);

          scope.findGoogleBooks();

          $httpBackend.flush();

          expect(scope.book.title).toEqual('How to enjoy pairing - 2nd Edition');
          expect(scope.book.subtitle).toEqual('The francieli-ekow way');
          expect(scope.book.isbn).toEqual('985693865986');

          expect(scope.bookExistsInTheLibrary).toBe(false);

          expect(scope.formShowable).toBe(true);
          expect(scope.errorShowable).toBe(false);
        })
      );

      it('shows error message when no book in found in google',
        inject(function ($controller, $httpBackend, ENV) {
          scope.searchCriteria = '985693865986';

          var libraryData = {};
          var googleData = {};

          $httpBackend
            .expectGET(ENV.apiEndpoint + '/books/search/findByIsbn?isbn=' + scope.searchCriteria)
            .respond(200, libraryData);

          $httpBackend.expectGET('views/library/index.html')
            .respond(200);

          $httpBackend
            .expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:' + scope.searchCriteria)
            .respond(200, googleData);

          scope.findGoogleBooks();

          $httpBackend.flush();

          expect(scope.book).toEqual({});

          expect(scope.formShowable).toBe(false);
          expect(scope.errorShowable).toBe(true);
        })
      );
    });
  });

  describe('#getCurrentLibraryPath', function () {
    it('routes to root when library path param is not set', function () {
      expect(scope.getCurrentLibraryPath()).toBe('#/libraries');
    });

    it('routes to library path when library path param is set', inject(function ($location, $route) {
      var route = $route;
      route.current = {'pathParams': {'library': 'random'}};

      expect(scope.getCurrentLibraryPath()).toBe('#/library/random');
    }));
  });

  describe('#isInsideLibrary', function () {
    it('returns true when current route is defined',
      inject(function ($route) {
        var route = $route;
        route.current = {'pathParams': {'library': 'random'}};

        expect(scope.isInsideLibrary()).toBe(true);
      }));

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
        var route, httpBackend, window, library, librarySearchEndpoint, addBookEndpoint, addCopyEndpoint;

        beforeEach(inject(function ($route, $httpBackend, $window, ENV) {
          route = $route;
          route.current = {'pathParams': {'library': 'bh'}};

          httpBackend = $httpBackend;
          window = $window;

          librarySearchEndpoint = ENV.apiEndpoint + '/libraries/search/findBySlug?slug=' + slug;
          addBookEndpoint = ENV.apiEndpoint + '/books';
          addCopyEndpoint = ENV.apiEndpoint + '/copies';

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

          spyOn($window, 'alert');

          scope.book = {'title': 'How to increase test coverage'};
          scope.bookExistsInTheLibrary = false;

          httpBackend
            .expectGET(librarySearchEndpoint)
            .respond(200, library);

          httpBackend.expectGET('views/library/index.html')
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
          expect(window.location.replace).toHaveBeenCalledWith('/#/library/' + slug);
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
        it('shows alert when library is not found', inject(function ($translate, $httpBackend, $window, $route, ENV) {
          var library = {};
          var librarySearchEndpoint = ENV.apiEndpoint + '/libraries/search/findBySlug?slug=bh';
          var route = $route;
          route.current = {'pathParams': {'library': 'bh'}};

          scope.book = {};
          scope.bookExistsInTheLibrary = false;

          $httpBackend
            .expectGET(librarySearchEndpoint)
            .respond(200, library);

          $httpBackend.expectGET('views/library/index.html')
            .respond(200);

          spyOn($translate, 'instant');
          spyOn($window, 'alert');

          scope.addBookToLibrary();

          $httpBackend.flush();

          expect($translate.instant).toHaveBeenCalledWith('INVALID_LIBRARY_ERROR');
          expect($window.alert).toHaveBeenCalled();
          expect(scope.addingBook).toBe(true);
        }));
      });
    });

    describe('when book already exists', function () {
      var slug = 'bh';
      var library, route, window, httpBackend, librarySearchEndpoint, addBookEndpoint, addCopyEndpoint;

      beforeEach(inject(function ($route, $httpBackend, $window, ENV) {
        httpBackend = $httpBackend;
        route = $route;
        window = $window;

        librarySearchEndpoint = ENV.apiEndpoint + '/libraries/search/findBySlug?slug=' + slug;
        addBookEndpoint = ENV.apiEndpoint + '/books';
        addCopyEndpoint = ENV.apiEndpoint + '/copies';

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

        $httpBackend
          .expectGET(librarySearchEndpoint)
          .respond(200, library);

        $httpBackend.expectGET('views/library/index.html')
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
        expect(window.location.replace).toHaveBeenCalledWith('/#/library/' + slug);
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
    var route, searchUrl, httpBackend, library;
    var slug = 'bh';

    beforeEach(inject(function ($httpBackend, $route, ENV) {
      httpBackend = $httpBackend;

      route = $route;
      route.current = {'pathParams': {'library': slug}};

      searchUrl = ENV.apiEndpoint + '/libraries/search/findBySlug?slug=' + slug;

      library = {
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
    }));

    it('sets copies to be empty when copies retrieval fails', function () {
      httpBackend.expectGET(searchUrl)
        .respond(500);

      httpBackend.expectGET('views/library/index.html')
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      expect(scope.copies).toEqual([]);
    });

    it('correctly initializes each copy when copy has no imageUrl', function () {
      httpBackend.expectGET(searchUrl)
        .respond(200, library);

      httpBackend.expectGET('views/library/index.html')
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

      httpBackend.expectGET('views/library/index.html')
        .respond(200);

      scope.listBooks();

      httpBackend.flush();

      expect(scope.copies.length).toEqual(1);
      expect(scope.copies[0].title).toEqual('Enjoying Fifa with your eyes closed.');
      expect(scope.copies[0].imageUrl).toEqual('path/to/image');
    });
  });

  describe('#gotoAddBook', function () {
    it('redirects to add book page for current slug', inject(function ($window, $route) {
      var route = $route;
      route.current = {'pathParams': {'library': 'quito'}};

      spyOn($window.location, 'assign');

      scope.gotoAddBook();

      expect($window.location.assign).toHaveBeenCalledWith('/#/library/quito/add_book');
    }));
  });
});
