'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', function($scope, $http) {

    $scope.searchCriteria = "";

    $scope.findGoogleBooks = function findGoogleBooks() {
        if($scope.searchCriteria.toString() != "") {
            var endPoint = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + $scope.searchCriteria.toString();

            $http.get(endPoint).
                success(function (data) {
                	$scope.books = [];
                    $scope.book = {};

                    if (data.total_items !== 0) {
                 		angular.forEach(data.items, function (item) {
                 			var book = {};
                            var bookInfo = item.volumeInfo;

                 			book.title = bookInfo.title;
                 			book.author = bookInfo.authors.join(",");
                 			book.subtitle = bookInfo.subtitle;
                 			book.description = bookInfo.description;
                 			angular.forEach(bookInfo.industryIdentifiers, function (isbn) {
                 				if (isbn.type === 'ISBN_13') {
                 					book.isbn13 = isbn.identifier;
                 				}
                 			});
                 			book.publisher = bookInfo.publisher;
                 			book.publicationDate = bookInfo.publishedDate;
                 			book.numberOfPages = bookInfo.pageCount;
                 			book.imageUrl = bookInfo.imageLinks.thumbnail;
                 			 
                            $scope.book = book;
                            $scope.books = book;
                        });
                    }
               });
        }
    }

});