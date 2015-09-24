'use strict';

var app = angular.module('libraryUiApp');

app.controller('ModalCtrl', ['$scope', 'Modal', function ($scope, Modal) {
    $scope.cancel = function() {
      Modal.reject();
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
