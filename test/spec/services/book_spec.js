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
    it('it calls the google books api with search criteria', function(){
      httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:84698439325325').respond(200);

      bookService.findGoogleBooks('84698439325325');

      httpBackend.flush();
    });
  });

  describe('#findLibraryBook', function(){
    it('it invokes backend findBookByIsbn endpoint', function(){
      httpBackend.expectGET(apiEndpoint + '/books/search/findByIsbn?isbn=8964869863').respond(200);

      bookService.findLibraryBook('8964869863');

      httpBackend.flush();
    });
  });
});