'use strict';

angular
  .module('libraryUiApp')
  .directive('bookActionButtons', function() {
    function actionButtonsController ($scope) {

      $scope.borrowerIsCurrentUser = function (copy) {
        if (copy.lastLoan !== undefined && copy.lastLoan !== null) {
          return copy.lastLoan.email.toLowerCase() === window.sessionStorage['email'].toLowerCase();
        } else {
          return false;
        }
      };
    }

    return {
      restrict: 'E',
      scope: { copy: '=' },
      replace: true,
      controller: actionButtonsController,
      templateUrl: 'templates/book-action-buttons.html'
    };
  });
