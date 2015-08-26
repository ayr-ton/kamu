'use strict';

var app = angular.module('libraryUiApp');

app.controller('BorrowModalCtrl', function ($scope, Modal) {
    $scope.copy = Modal.params().copy;
    $scope.cancel = Modal.reject;

    $scope.submit = function () {
      var loan = { copy: $scope.copy, email: $scope.form.user + '@thoughtworks.com' };
      Modal.resolve(loan);
    };
  }
);

app.controller('ReturnModalCtrl', function($scope, Modal) {
    $scope.loan = Modal.params().loan;
    $scope.cancel = Modal.reject;

    $scope.submit = function() {
      var loan = { loan: $scope.loan};

      Modal.resolve(loan);
    };
  }
);
