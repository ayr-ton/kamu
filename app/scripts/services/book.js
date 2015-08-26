'use strict';

angular
  .module('libraryUiApp')
  .service('BookService', function ($http, ENV) {
    var postConfiguration = {'Content-Type': 'application/json; charset=utf-8'};

    this.findGoogleBooks = function (searchCriteria) {
      var endPoint = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + searchCriteria;

      return $http.get(endPoint);
    };

    this.findLibraryBook = function (searchCriteria) {
      var endPoint = ENV.apiEndpoint + '/books/search/findByIsbn?isbn=' + searchCriteria;

      return $http.get(endPoint);
    };


    this.getCopy = function (copy) {
      var endPoint = ENV.apiEndpoint.concat('/copies/').concat(copy).concat('?projection=copyWithBookInline');

      return $http.get(endPoint);
    };

    this.extractBookInformation = function (bookInfo, searchCriteria) {
      var targetBookIdentifier = 'ISBN_13';

      var book = {};

      angular.forEach(bookInfo.industryIdentifiers, function (isbn) {
        if (isbn.type === targetBookIdentifier && isbn.identifier === searchCriteria) {
          book = buildBook(bookInfo, isbn);
        }
      });

      return book;
    };

    this.resolveBookImage = function (imageUrl) {
      return resolveBookImage(imageUrl);
    };

    this.addBook = function (book) {
      var endPoint = ENV.apiEndpoint + '/books';

      return $http.post(endPoint, book, postConfiguration);
    };

    this.addCopy = function (copy) {
      var endPoint = ENV.apiEndpoint + '/copies';

      return $http.post(endPoint, copy, postConfiguration);
    };

    this.getLibraryBySlug = function (slug) {
      var endPoint = ENV.apiEndpoint + '/libraries/search/findBySlug?slug=' + slug;

      return $http.get(endPoint);
    };

    this.getCopies = function (copiesUrl) {
      return $http.get(copiesUrl);
    };

    function buildBook(bookInfo, isbn) {
      var book = {};

      book.title = bookInfo.title;
      if (bookInfo.authors !== undefined) {
        book.author = bookInfo.authors.join();
      }
      book.subtitle = bookInfo.subtitle;
      book.description = bookInfo.description;
      book.isbn = isbn.identifier;
      book.publisher = bookInfo.publisher;
      book.publicationDate = bookInfo.publishedDate;
      book.numberOfPages = bookInfo.pageCount;
      var imageUrl = bookInfo.imageLinks === undefined ? null : bookInfo.imageLinks.thumbnail;
      book.imageUrl = resolveBookImage(imageUrl);

      return book;
    }

    function resolveBookImage(imageUrl) {
      return (imageUrl === null || imageUrl === undefined) ? 'images\\no-image.png' : imageUrl ;
    }
  });
