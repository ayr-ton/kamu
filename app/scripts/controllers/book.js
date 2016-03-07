'use strict';

angular
  .module('libraryUiApp')
  .controller('BookController', [
    '$scope',
    '$routeParams',
    'BookService',
    'UserService',
    'LoanService',
    function ($scope, $routeParams, BookService, UserService, LoanService) {
      $scope.library = $routeParams.library;
          
      function initializeCopy(copy) {
        if (copy.imageUrl === undefined || copy.imageUrl === null) {
          copy.imageUrl = 'images/no-image.png';
        }

        if (copy.lastLoan !== undefined && copy.lastLoan !== null) {
          copy.lastLoan.user = {};
          copy.lastLoan.user.imageUrl = UserService.getGravatarFromUserEmail(copy.lastLoan.email);
        }

        return copy;
      }

 
      $scope.listBooks = function () {

        $scope.copies = [];

        BookService.getCopiesByLibrarySlug($scope.library)
          .success(function (data) {
            if (angular.isDefined(data._embedded) && data._embedded.copies) {
              var available;          
              $scope.copies = data._embedded.copies;
              var email = window.sessionStorage.email.toLowerCase();
                          
              angular.forEach($scope.copies, function (copy) {
                  LoanService.hasUserBorrowedThisCopy($scope.library, copy.reference, email).success(function(pendingUserData){
                  available = BookService.getAvailableQuantityCopies($routeParams.library,copy.reference);
                  available.then(function(availableQuantity) {   
                      available=availableQuantity.data;
                  
                      if((available > 0) && (pendingUserData === 0)){
                         copy.status = 'AVAILABLE';
                      }
                      else if ((available === 0) || (pendingUserData > 0)){
                          copy.status = 'BORROWED';
                      }
                      copy = initializeCopy(copy);
        
                  });
                }); 

              });          
            }
          });
      };
 
      $scope.$on('$viewContentLoaded', function () {

        $scope.listBooks();
      });

    }]
);
