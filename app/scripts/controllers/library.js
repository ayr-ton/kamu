'use strict';

angular
  .module('libraryUiApp')
  .controller('LibraryCtrl', ['$scope', '$http', 'ENV', function($scope, $http, ENV) {
    $scope.libraries = {};

    var listLibraries = function() {
      $http.get(ENV.apiEndpoint + '/libraries').
        success(function(data) {
          $scope.libraries = angular.isDefined(data._embedded) ? data._embedded.libraries : {}
        });
    };

    listLibraries();
  }]);