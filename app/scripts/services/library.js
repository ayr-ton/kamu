'use strict';

angular
  .module('libraryUiApp')
  .service('LibraryService', function($http, ENV){

    this.getLibraries = function() {
        return $http.get(ENV.apiEndpoint + '/libraries');
      };

  });