'use strict';

var app = angular.module('libraryUiApp');

app.controller('ModalCtrl', ['$scope', 'Modal', function ($scope, Modal) {
    $scope.cancel = function() {
      Modal.reject();
    };
  }]
);

app.controller('BorrowModalCtrl', ['$scope', 'Modal', function ($scope, Modal) {
    $scope.copy = Modal.params().copy;

    $scope.submit = function () {
      var loan = { copy: $scope.copy, email: $scope.form.user + '@thoughtworks.com' };
      Modal.resolve(loan);
    };
  }]
);

app.controller('ReturnModalCtrl', ['$scope', 'Modal', function($scope, Modal) {
    $scope.loan = Modal.params().loan;

    $scope.submit = function() {
      var loan = { loan: $scope.loan};

      Modal.resolve(loan);
    };
  }]
);
