'use strict';

angular
  .module('libraryUiApp')
  .service('LoanService', function($http, ENV) {
    var postConfiguration = { 'Content-Type': 'application/json; charset=utf-8' };

    this.borrowCopy = function (copy, email) {
      var loan = {};
      loan.copy = ENV.apiEndpoint.concat('/copies/').concat(copy);
      loan.email = email;

      var endPoint = ENV.apiEndpoint.concat('/loans');

      return $http.post(endPoint, loan, postConfiguration);
    };
  });
