'use strict';

describe('LibraryService', function () {

  beforeEach(module('libraryUiApp'));

  describe('listLibraries', function () {
    it('requests list of libraries from api', inject(function ($injector, $http, ENV) {
      var libraryService = $injector.get('LibraryService');
      var url = ENV.apiEndpoint + '/libraries';

      spyOn($http, 'get');

      libraryService.getLibraries();

      expect($http.get).toHaveBeenCalledWith(url);
    }));
  });
});
