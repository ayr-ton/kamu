'use strict';

angular
  .module('libraryUiApp')
  .service('BookService', function($http, ENV) {
    this.findGoogleBooks = function(searchCriteria) {
        var endPoint = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + searchCriteria;

        return $http.get(endPoint);
    };

    this.findLibraryBook = function(searchCriteria) {
        var endPoint = ENV.apiEndpoint + '/books/search/findByIsbn?isbn=' + searchCriteria;

        return $http.get(endPoint);
    };

    this.extractBookInformation = function(bookInfo, searchCriteria) {
        var targetBookIdentifier = 'ISBN_13';

        var book = {};

        angular.forEach(bookInfo.industryIdentifiers, function (isbn) {
            if (isbn.type === targetBookIdentifier && isbn.identifier === searchCriteria) {
                book = buildBook(bookInfo, isbn);
            }
        });

        return book;
    };

    function buildBook(bookInfo, isbn) {
        var book = {};

        book.title = bookInfo.title;
        book.author = bookInfo.authors.join();
        book.subtitle = bookInfo.subtitle;
        book.description = bookInfo.description;
        book.isbn = isbn.identifier;
        book.publisher = bookInfo.publisher;
        book.publicationDate = bookInfo.publishedDate;
        book.numberOfPages = bookInfo.pageCount;
        var imageUrl = bookInfo.imageLinks === undefined ? null : bookInfo.imageLinks.thumbnail;
        book.imageUrl = resolveBookImage(imageUrl);
        book.donator = '';

        return book;
    }

    function resolveBookImage(imageUrl) {
        return imageUrl !== null ? imageUrl : 'images\\no-image.png';
    }

    this.resolveBookImage = function(imageUrl) {
        return resolveBookImage(imageUrl);
    };

    
    this.addBook = function (book) {
        var endPoint = ENV.apiEndpoint + '/books';
        return $http.post(endPoint, book, { "Content-Type": "application/json; charset=utf-8" });
    };

    this.addCopy = function (copy) {
        var endPoint = ENV.apiEndpoint + '/copies';
        return $http.post(endPoint, copy, { "Content-Type": "application/json; charset=utf-8" });
    };

    this.findLibrary = function(id) {
        var endPoint = ENV.apiEndpoint + '/libraries/' + id;
        return $http.get(endPoint);
    };

});
