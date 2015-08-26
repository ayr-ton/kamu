'use strict';

describe('BookService', function(){
  var bookService, httpBackend;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function(_$httpBackend_, BookService){
    bookService = BookService;
    httpBackend = _$httpBackend_;
  }));

  describe('#findGoogleBooks', function(){
    it('it calls the google books api with search criteria', function(){
      httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=isbn:84698439325325').respond(200);

      bookService.findGoogleBooks('84698439325325');

      httpBackend.flush();
    });
  });
});