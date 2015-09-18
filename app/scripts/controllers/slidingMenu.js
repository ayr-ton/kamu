/**
 * Created by lmunda on 9/17/15.
 */

angular
  .module('libraryUiApp')
  .controller("slidingMenu", ['$scope', '$rootScope', function ($scope, $rootScope) {
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

    $rootScope.$on("documentClicked", _close);
    $rootScope.$on("escapePressed", _close);
  }]);
