'use strict';

angular
  .module('libraryUiApp')
  .directive('bookActionButtons', [
    '$translate',
    'LoanService',
    'BookService',
    'UserService',
    'toastr',
    function($translate, LoanService, BookService, UserService, toastr) {
      function actionButtonsController ($scope) {

        $scope.borrowerIsCurrentUser = function (copy) {
          if (copy.lastLoan !== undefined && copy.lastLoan !== null) {
            return copy.lastLoan.email.toLowerCase() === window.sessionStorage['email'].toLowerCase();
          } else {
            return false;
          }
        };

        $scope.borrowCopy = function (copy) {
          var currentUser = window.sessionStorage.email;

          LoanService.
            borrowCopy(copy.id, currentUser).
            success(function () {
              BookService.getCopy(copy.id)
                .success(function (data) {
                  $scope.copy = data;
                  $scope.copy.imageUrl = BookService.resolveBookImage($scope.copy.imageUrl);

                  $scope.copy.lastLoan.user = {
                    imageUrl: UserService.getGravatarFromUserEmail($scope.copy.lastLoan.email)
                  };
                });
                toastr.success('Book has been loaned to '.concat(currentUser).concat('.'));
            }).
            error(function (data, status) {
              var errorMessage;

              switch (status) {
                case 412:
                  errorMessage = $translate.instant('HTTP_CODE_412');
                  break;
                case 409:
                  errorMessage = $translate.instant('HTTP_CODE_409');
                  break;
                default:
                  errorMessage = $translate.instant('HTTP_CODE_500');
                  break;
              }
              toastr.error(errorMessage);
            });
        };
      }

      return {
        restrict: 'E',
        scope: { copy: '=' },
        replace: true,
        controller: actionButtonsController,
        templateUrl: 'templates/book-action-buttons.html'
      };
  }]);
