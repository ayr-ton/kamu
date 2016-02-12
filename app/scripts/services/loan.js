'use strict';

angular
  .module('libraryUiApp')
  .service('LoanService', ['$http', 'ENV', function($http, ENV) {
    var postConfiguration = { 'Content-Type': 'application/json; charset=utf-8' };

    this.borrowCopy = function (copy, email) {
      var loan = {};
      loan.copy = ENV.apiEndpoint.concat('/copies/').concat(copy);
      loan.email = email;

      var endPoint = ENV.apiEndpoint.concat('/loans');

      return $http.post(endPoint, loan, postConfiguration);
    };

    this.returnCopy = function (loanId) {
      var endPoint = ENV.apiEndpoint.concat('/loans/').concat(loanId);

      var loan = {};

      return $http.patch(endPoint, loan, postConfiguration);
    };

    this.getListOfPendingLoans = function (slug, book) {
      var endPoint = ENV.apiEndpoint.concat('/loans/search/findByEndDateIsNullAndCopyLibrarySlugAndCopyBookId?slug=').concat(slug).concat('&book=').concat(book);

      return $http.get(endPoint);
    };
  }]);
