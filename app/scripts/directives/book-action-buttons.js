'use strict';

angular
  .module('libraryUiApp')
  .directive('bookActionButtons', [
    '$translate',
    'LoanService',
    'BookService',
    'UserService',
    'toastr',
    'Modal',
    function($translate, LoanService, BookService, UserService, toastr, Modal) {
      function actionButtonsController ($scope) {

        $scope.borrowerIsCurrentUser = function (copy) {
          if (copy.lastLoan !== undefined && copy.lastLoan !== null) {
            return copy.lastLoan.email.toLowerCase() === window.sessionStorage.email.toLowerCase();
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
                var successMessage = $translate.instant('BORROW_SUCCESS');
                toastr.success(successMessage.concat(currentUser).concat('.'));
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

        $scope.returnCopy = function (copy) {
          $scope.loan = copy.lastLoan;

          var promise = Modal.open(
            'not-available', {loan : copy.lastLoan}
          );

          promise.then(
            function handleResolve(response) {
              LoanService.
                returnCopy(response.loan.id).
                success(function () {
                  Modal.reject();

                  var successMessage = $translate.instant('RETURN_SUCCESS');
                  toastr.success(successMessage);

                  BookService.getCopy(copy.id)
                    .success(function (data) {
                      $scope.copy = data;
                      $scope.copy.imageUrl = BookService.resolveBookImage($scope.copy.imageUrl);
                    });
                }).
                error(function (data, status) {
                  var errorMessage;

                  switch (status) {
                    case 428:
                      errorMessage = $translate.instant('HTTP_CODE_428');
                      break;
                    default:
                      errorMessage = $translate.instant('HTTP_CODE_500');
                      break;
                  }

                  toastr.error(errorMessage);
                });
            }
          );
        };
      }

      return {
        restrict: 'E',
        scope: { copy: '=' },
        replace: true,
        controller: ['$scope', actionButtonsController],
        templateUrl: 'templates/book-action-buttons.html'
      };
  }]);
