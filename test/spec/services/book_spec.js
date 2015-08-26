'use strict';

describe('BookService', function(){
  var apiEndpoint, bookService, httpBackend;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function(_$httpBackend_, BookService, ENV){
    bookService = BookService;
    httpBackend = _$httpBackend_;
    apiEndpoint = ENV.apiEndpoint;
  }));

  describe('#findGoogleBooks', function(){
    it('calls the google books api with search criteria', function(){
      httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:84698439325325').respond(200);

      bookService.findGoogleBooks('84698439325325');

      httpBackend.flush();
    });
  });

  describe('#findLibraryBook', function(){
    it('invokes backend findBookByIsbn endpoint', function(){
      httpBackend.expectGET(apiEndpoint.concat('/books/search/findByIsbn?isbn=8964869863')).respond(200);

      bookService.findLibraryBook('8964869863');

      httpBackend.flush();
    });
  });

  describe('#getCopy', function(){
    it('retrieves copies using the inline projection', function(){
      httpBackend.expectGET(apiEndpoint.concat('/copies/34?projection=copyWithBookInline')).respond(200);

      bookService.getCopy('34');

      httpBackend.flush();
    });
  });
});