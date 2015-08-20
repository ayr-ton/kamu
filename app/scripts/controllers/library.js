'use strict';

var app = angular.module('libraryUiApp');

app.controller('LibraryCtrl', ['$scope', '$http', 'ENV', function($scope, $http, ENV) {
    $scope.libraries = {};

    var listLibraries = function() {
      $http.get(ENV.apiEndpoint + '/libraries').
        success(function(data) {
          $scope.libraries = data._embedded || {};
        });
    };

    listLibraries();
  }]);