'use strict';

angular
  .module('libraryUiApp')
  .controller('LibraryCtrl', ['$scope', '$http', 'LibraryService', 'UserService', function ($scope, $http, LibraryService, UserService) {
    $scope.libraries = {};

    var listLibraries = function () {
      LibraryService.getLibraries().
        success(function (data) {
          $scope.libraries = angular.isDefined(data._embedded) ? data._embedded.libraries : {};
        });
    };

    $scope.getGravatarFromSession = function(){
      return UserService.getGravatarFromSession();
    };

    listLibraries();
  }]);
