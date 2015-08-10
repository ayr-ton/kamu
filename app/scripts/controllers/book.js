'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', function($scope, $http) {

    $scope.searchCriteria = "";

    $scope.findGoogleBooks = function findGoogleBooks() {
        var searchCriteria = $scope.searchCriteria.toString();

        if(searchCriteria != "") {
            var endPoint = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + searchCriteria;

            console.log(endPoint);

            $http.get(endPoint).
                success(function (data) {
                    $scope.book = {};

                    if (data.total_items !== 0) {
                 		angular.forEach(data.items, function (item) {
                            var bookInfo = item.volumeInfo;

                 			angular.forEach(bookInfo.industryIdentifiers, function (isbn) {
                 				if (isbn.type === 'ISBN_13' && isbn.identifier == searchCriteria) {
                                    var book = {};

                                    book.title = bookInfo.title;
                                    book.author = bookInfo.authors.join(",");
                                    book.subtitle = bookInfo.subtitle;
                                    book.description = bookInfo.description;
                 					book.isbn13 = isbn.identifier;
                                    book.publisher = bookInfo.publisher;
                                    book.publicationDate = bookInfo.publishedDate;
                                    book.numberOfPages = bookInfo.pageCount;
                                    book.imageUrl = bookInfo.imageLinks.thumbnail;
                                     
                                    $scope.book = book;
                 				}
                 			});
                 			
                        });
                    }
               });
        }
    }

});