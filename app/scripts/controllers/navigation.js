'use strict';

angular
  .module('libraryUiApp')
  .controller('NavigationController', ['$scope', '$location', function ($scope, $location) {
    $scope.library = '';

    $scope.hasLoadedLibrary = function () {
      return $scope.library !== '';
    };

    $scope.isActive = function (who) {
      if (who === '/') {
        return /\/library\/[a-zA-Z0-9_]*\/?$/.test($location.path());
      }
      return $location.path().indexOf(who) > 0;
    };

    $scope.$on('$routeChangeSuccess', function (previous, current) {
      $scope.library = current.pathParams.library || '';
    });
  }]);
