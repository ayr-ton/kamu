'use strict';

angular
  .module('libraryUiApp')
  .controller('LibraryCtrl', ['$scope', '$http', 'LibraryService', function($scope, $http, LibraryService) {
    $scope.libraries = {};

    var listLibraries = function() {
      LibraryService.getLibraries().
        success(function(data) {
          $scope.libraries = angular.isDefined(data._embedded) ? data._embedded.libraries : {};
        });
    };

    listLibraries();
  }]);