'use strict';

describe('BookService', function() {
  var apiEndpoint, bookService, httpBackend;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function(_$httpBackend_, BookService, ENV){
    bookService = BookService;
    httpBackend = _$httpBackend_;
    apiEndpoint = ENV.apiEndpoint;
  }));

  describe('#findGoogleBooks', function() {
    it('calls the google books api with search criteria', function() {
      httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:84698439325325').respond(200);

      bookService.findGoogleBooks('84698439325325');

      httpBackend.flush();
    });
  });

  describe('#findLibraryBook', function() {
    it('invokes backend findBookByIsbn endpoint', function() {
      httpBackend.expectGET(apiEndpoint.concat('/books/search/findByIsbn?isbn=8964869863')).respond(200);

      bookService.findLibraryBook('8964869863');

      httpBackend.flush();
    });
  });

  describe('#getCopy', function() {
    it('retrieves copies using the inline projection', function() {
      httpBackend.expectGET(apiEndpoint.concat('/copies/34?projection=copyWithBookInline')).respond(200);

      bookService.getCopy('34');

      httpBackend.flush();
    });
  });

  describe('#extractBookInformation', function() {
    var searchCriteria = '8963476989';

    it('returns an empty book when bookInfo is empty', function() {
      expect(bookService.extractBookInformation({}, searchCriteria)).toEqual({});
    });

    it('returns an empty book when bookInfo is present but with no matching isbn13', function() {
      var googleBook = {
          'title': 'How to enjoy pairing - 2nd Edition',
          'subtitle': 'The francieli-ekow way',
          'industryIdentifiers': [
            {
              'type': 'ISBN_13',
              'identifier': '0000000000000'
            }
          ]
        };

      expect(bookService.extractBookInformation(googleBook, searchCriteria)).toEqual({});
    });

    it('correctly initializes book when bookInfo is present', function() {
      var googleBook = {
          'title': 'How to enjoy pairing - 2nd Edition',
          'subtitle': 'The francieli-ekow way',
          'industryIdentifiers': [
            {
              'type': 'ISBN_13',
              'identifier': searchCriteria
            }
          ]
        };

      var book = bookService.extractBookInformation(googleBook, searchCriteria);

      expect(book.title).toEqual('How to enjoy pairing - 2nd Edition');
      expect(book.subtitle).toEqual('The francieli-ekow way');
      expect(book.isbn).toEqual(searchCriteria);
      expect(book.imageUrl).toEqual('images\\no-image.png');
    });
  });

  describe('#resolveBookImage', function() {
    it('returns default url when imageUrl is null', function() {
      expect(bookService.resolveBookImage(null)).toBe('images\\no-image.png');
    });

    it('returns default url when imageUrl is undefined', function() {
      expect(bookService.resolveBookImage(undefined)).toBe('images\\no-image.png');
    });

    it('returns passed imageUrl when it is neither null or undefined', function() {
      expect(bookService.resolveBookImage('path/to/image')).toBe('path/to/image');
    });
  });

  describe('#addBook', function() {
    it('calls backend api to add book', function() {
      var book = { 'title': 'Some wicked title' };

      httpBackend.expectPOST(apiEndpoint.concat('/books'), book).respond(200);

      bookService.addBook(book);

      httpBackend.flush();
    });
  });

  describe('#addCopy', function() {
    it('calls backend api to add a copy', function() {
      var copy = { 'title': 'Some wicked title' };

      httpBackend.expectPOST(apiEndpoint.concat('/copies'), copy).respond(200);

      bookService.addCopy(copy);

      httpBackend.flush();
    });
  });
});