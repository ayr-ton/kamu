'use strict';

angular
  .module('libraryUiApp')
  .controller('BookCtrl', function($scope, BookService) {

    $scope.searchCriteria = '';

    $scope.findGoogleBooks = function() {
        var searchCriteria = $scope.searchCriteria.toString();
        
        $scope.book = {};

        if (searchCriteria !== '') {
            BookService.findGoogleBooks(searchCriteria).
                success(function (data) {
                    angular.forEach(data.items, function (item) {
                        $scope.book = BookService.extractBookInformation(item.volumeInfo, searchCriteria);
                    });
                });
        }   
    };
});