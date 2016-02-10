'use strict';

angular
  .module('libraryUiApp')
  .controller('BookController', [
    '$scope',
    '$routeParams',
    'BookService',
    'UserService',
    function ($scope, $routeParams, BookService, UserService) {
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
                          
              angular.forEach($scope.copies, function (copy) {
                available = BookService.getAvailableQuantityCopies($routeParams.library,copy.reference);
                available.then(function(availableQuantity) {
              
                    available=availableQuantity.data;

                    if(available){
                        copy.status = 'AVAILABLE';
                        console.log('alterou para AVAILABLE');
                    }
                    else {
                      copy.status = 'BORROWED';
                      console.log('alterou para BORROWED');
                    }
                   copy = initializeCopy(copy);
        
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
