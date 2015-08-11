'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', function($scope, BookService) {

    $scope.searchCriteria = '';

    $scope.findGoogleBooks = function() {
        var searchCriteria = $scope.searchCriteria.toString();
        
        $scope.book = {};

        if (searchCriteria !== '') {
            BookService.findLibraryBook(searchCriteria).
                success(function(data){
                    console.log(data);

                    if (data._embedded !== undefined) {
                        $scope.book = data._embedded.books[0];

                        $scope.book.imageUrl = BookService.resolveBookImage($scope.book.imageUrl);
                    } else {
                        BookService.findGoogleBooks(searchCriteria).
                            success(function (data) {
                                angular.forEach(data.items, function (item) {
                                    $scope.book = BookService.extractBookInformation(item.volumeInfo, searchCriteria);
                                });
                            });
                    }

                });
        }   
    };
});