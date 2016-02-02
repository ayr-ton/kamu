'use strict';

angular
  .module('libraryUiApp')
  .service('BookService', ['$http', 'ENV', function ($http, ENV) {
    var postConfiguration = {'Content-Type': 'application/json; charset=utf-8'};
    this.currentBook = {};

    this.findGoogleBooks = function (searchCriteria) {
      var endPoint = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'.concat(searchCriteria);

      return $http.get(endPoint);
    };

    this.findLibraryBook = function (searchCriteria) {
      var endPoint = ENV.apiEndpoint.concat('/books/search/findByIsbn?isbn=').concat(searchCriteria);

      return $http.get(endPoint);
    };

    this.getCopy = function (copy) {
      var endPoint = ENV.apiEndpoint.concat('/copies/').concat(copy).concat('?projection=copyWithBookInline');

      return $http.get(endPoint);
    };

   this.getBook = function (bookId) {
      var endPoint = ENV.apiEndpoint.concat('/books/').concat(bookId);

      return $http.get(endPoint);
    };

    function resolveBookImage(imageUrl) {
      var defaultImageUrl = 'images\\no-image.png';

      return (imageUrl === null || imageUrl === undefined) ? defaultImageUrl : imageUrl ;
    }

    this.resolveBookImage = function (imageUrl) {
      return resolveBookImage(imageUrl);
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

    this.addBook = function (book) {
      var endPoint = ENV.apiEndpoint.concat('/books');

      return $http.post(endPoint, book, postConfiguration);
    };

    this.addCopy = function (copy) {
      var endPoint = ENV.apiEndpoint.concat('/copies');

      return $http.post(endPoint, copy, postConfiguration);
    };

    this.getLibraryBySlug = function (slug) {
      var endPoint = ENV.apiEndpoint.concat('/libraries/search/findBySlug?slug=').concat(slug);

      return $http.get(endPoint);
    };

    this.getCopiesByLibrarySlug = function (slug) {
      var endPoint = ENV.apiEndpoint.concat('/copies/search/findCopiesByLibrarySlug?slug=').concat(slug);

      return $http.get(endPoint);
    };

    this.getQuantityCopies = function (slug,book) {
     var endPoint = ENV.apiEndpoint.concat('/copies/search/countByLibrarySlugAndBookId?slug=').concat(slug).concat('&book=').concat(book);
    
      return $http.get(endPoint);
    };

    this.getAvailableQuantityCopies = function (slug,book) {
     var endPoint = ENV.apiEndpoint.concat('/copies/search/countByLibrarySlugAndBookIdAndStatus?slug=').concat(slug).concat('&book=').concat(book).concat('&status=').concat('AVAILABLE');
    window.alert(endPoint);
      return $http.get(endPoint);
    };

    this.getCopies = function (copiesUrl) {
      return $http.get(copiesUrl);
    };

  }]);
