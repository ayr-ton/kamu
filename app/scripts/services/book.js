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
        book.author = bookInfo.authors;
        book.subtitle = bookInfo.subtitle;
        book.description = bookInfo.description;
        book.isbn = isbn.identifier;
        book.publisher = bookInfo.publisher;
        book.publicationDate = bookInfo.publishedDate;
        book.numberOfPages = bookInfo.pageCount;
        var imageUrl = bookInfo.imageLinks == undefined ? null : bookInfo.imageLinks.thumbnail
        book.imageUrl = resolveBookImage(imageUrl);
        book.donator = '';

        return book;
    }

    function resolveBookImage(imageUrl) {
        return imageUrl !== null ? imageUrl : 'images\\no-image.png';
    }

    this.resolveBookImage = function(imageUrl) {
        return resolveBookImage(imageUrl);
    }
  });
