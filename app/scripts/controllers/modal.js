'use strict';

var app = angular.module('libraryUiApp');

app.controller('ModalController', ['$scope', 'Modal', function ($scope, Modal) {
    $scope.cancel = function() {
      Modal.reject();
    };
  }]
);

app.controller('ReturnModalController', ['$scope', 'Modal', function($scope, Modal) {
    $scope.loan = Modal.params().loan;

    $scope.submit = function() {
      var loan = { loan: $scope.loan};

      Modal.resolve(loan);
    };
  }]
);
