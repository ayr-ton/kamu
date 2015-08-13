'use strict';

var app = angular.module('libraryUiApp');

app.controller(
  "BorrowModalCtrl",
  function( $scope, modals ) {

    $scope.copy = modals.params().copy;

    $scope.cancel = modals.reject;

    $scope.submit = function() {
      if ( ! $scope.form.user ) {
        return( $scope.errorMessage = "Please identify yourself!" );
      }

      var loan = { copy: $scope.copy, email: $scope.form.user + "@thoughtworks.com" };

      modals.resolve(loan);

    };

  }
);

app.controller(
  "ReturnModalCtrl",
  function( $scope, modals ) {
    $scope.confirm = modals.resolve;
    $scope.deny = modals.reject;
  }
);
