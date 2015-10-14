'use strict';

angular.module('libraryUiApp')
.service('WaitingListService', ['$http', 'ENV', function ($http, ENV) {

  this.getWaitingList = function () {
    return $http.get(ENV.apiEndpoint + '/waitingLists');
  };

  this.getWaitingList = function (bookId, libraryId) {
    return $http.get(ENV.apiEndpoint + '/waitingLists/search/findByBookAndLibrary?book_id='+bookId+'&slug='+libraryId);
  };

  this.getDataFromURL = function (userURL) {
    return $http.get(userURL);
  };
}]);
