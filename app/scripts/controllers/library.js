'use strict';

angular
  .module('libraryUiApp')
  .controller('LibraryCtrl', ['$scope', '$http', 'LibraryService', 'ENV', function($scope, $http, LibraryService, ENV) {
    $scope.libraries = {};

    var listLibraries = function() {
      LibraryService.getLibraries().
        success(function(data) {
          $scope.libraries = angular.isDefined(data._embedded) ? data._embedded.libraries : {};
        });
    };

    listLibraries();
  }]);