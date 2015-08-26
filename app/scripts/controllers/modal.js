'use strict';

var app = angular.module('libraryUiApp');

app.controller('BorrowModalCtrl', function ($scope, modals) {
    $scope.copy = modals.params().copy;
    $scope.cancel = modals.reject;

    $scope.submit = function () {
  
        var loan = { copy: $scope.copy, email: $scope.form.user + '@thoughtworks.com' };
        modals.resolve(loan);
    
    };
  }
);

app.controller('ReturnModalCtrl', function( $scope, modals ) {

    $scope.loan = modals.params().loan;
    $scope.cancel = modals.reject;

    $scope.submit = function() {

      var loan = { loan: $scope.loan};

      modals.resolve(loan);
    
    };

  }
);
