'use strict';

angular
  .module('libraryUiApp')
  .controller('SlidingMenuController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.menuVisible = false;

    $scope.closeMenu = function () {
      $scope.menuVisible = false;
    };

    $scope.showMenu = function (e) {
      $scope.menuVisible = !$scope.menuVisible;
      e.stopPropagation();
    };

    function _close() {
      $scope.$apply(function () {
        $scope.closeMenu();
      });
    }

    $rootScope.$on('documentClicked', _close);
    $rootScope.$on('escapePressed', _close);
  }]);
