'use strict';

describe('LibraryService', function () {

  beforeEach(module('libraryUiApp'));

  describe('listLibraries', function () {
    it('requests list of libraries from api', inject(function (LibraryService, $httpBackend, ENV) {
      var url = ENV.apiEndpoint.concat('/libraries');

      $httpBackend.expectGET(url).respond(200);

      LibraryService.getLibraries(url);

      $httpBackend.flush();
    }));
  });
});
