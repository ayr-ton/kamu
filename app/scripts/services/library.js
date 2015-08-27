'use strict';

angular
  .module('libraryUiApp')
  .service('LibraryService', ['$http', 'ENV', function ($http, ENV) {

    this.getLibraries = function () {
      return $http.get(ENV.apiEndpoint + '/libraries');
    };
  }]);
