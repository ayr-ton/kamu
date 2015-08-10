'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', function($scope, $http) {
	var endPoint = "https://www.googleapis.com/books/v1/volumes?q=isbn:9780932633019";

   $scope.findGoogleBooks = function findGoogleBooks() {
        $http.get(endPoint).
            success(function (data) {
            	$scope.books = [];
                $scope.book = {};

                if (data.total_items !== 0) {
             		angular.forEach(data.items, function (item) {
             			var book = {};
             			book.title = item.volumeInfo.title;
             			book.author = item.volumeInfo.authors.join(",");
             			book.subtitle = item.volumeInfo.subtitle;
             			book.description = item.volumeInfo.description;
             			angular.forEach(item.volumeInfo.industryIdentifiers, function (isbn) {
             				if (isbn.type === 'ISBN_13') {
             					book.isbn13 = isbn.identifier;
             				}
             			});
             			book.publisher = item.volumeInfo.publisher;
             			book.publicationDate = item.volumeInfo.publishedDate;
             			book.numberOfPages = item.volumeInfo.pageCount;
             			book.imageUrl = item.volumeInfo.imageLinks[0];
             			 
                        $scope.books = book;
                    });
                }
           });
    	}
  });