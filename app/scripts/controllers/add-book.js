angular
  .module('libraryUiApp')
  .controller('AddBookController', ['$scope', 'BookService' ,function ($scope, BookService) {

    $scope.autoCompleteSearch = function () {
      $scope.formShowable = false;
      $scope.errorShowable = false;
      $scope.searchShowable = true;
      $scope.isbnSearch = true;
    };
    $scope.autoCompleteSearch();

    $scope.addManually = function () {
      $scope.book = {};
      $scope.searchShowable = false;
      $scope.isbnSearch = false;
      $scope.isGoogleBook = false;
      toggleFormDisplay(true);
    };

    $scope.findGoogleBooks = function () {
      var searchCriteria = $scope.searchCriteria.toString();

      $scope.book = {};

      if (searchCriteria !== '') {
        BookService.findLibraryBook(searchCriteria).
          success(populateBookFromLibraryApi).
          error(function () {
            toggleFormDisplay(false);
          });
      }
    };

    function toggleFormDisplay(displayable) {
      $scope.formShowable = displayable;
      $scope.errorShowable = !displayable;
    }

    function populateBookFromGoogleApi(data) {
      angular.forEach(data.items, function (item) {
        $scope.book = BookService.extractBookInformation(item.volumeInfo, $scope.searchCriteria);
        $scope.isGoogleBook = true;
      });

      var formDisplay = $scope.book.title !== undefined;
      toggleFormDisplay(formDisplay);

      if(!formDisplay) {
        $scope.addManually();
        $scope.errorShowable = !formDisplay;
      }
    };

    function populateBookFromLibraryApi(data) {
      $scope.bookExistsInTheLibrary = false;

      if (data._embedded !== undefined) {
        $scope.book = data._embedded.books[0];
        $scope.book.imageUrl = BookService.resolveBookImage($scope.book.imageUrl);
        $scope.bookExistsInTheLibrary = true;
        $scope.isGoogleBook = true;

        toggleFormDisplay(true);
      } else {
        BookService.findGoogleBooks($scope.searchCriteria).
          success(populateBookFromGoogleApi).
          error(function () {
            toggleFormDisplay(false);
          });
      }
    };
  }]);
