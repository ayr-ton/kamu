'use strict';

describe('LoanService', function () {
  beforeEach(module('libraryUiApp'));

  describe('#borrowCopy', function () {
    it('calls backend api to borrow loan with copy information', inject(function ($httpBackend, ENV, LoanService) {
      var copyId = '34';
      var email = 'e@mail.com';

      var loan = {
        'copy': ENV.apiEndpoint.concat('/copies/'.concat(copyId)),
        'email': email
      };

      $httpBackend.expectPOST(ENV.apiEndpoint.concat('/loans'), loan).respond(200);

      LoanService.borrowCopy(copyId, email);

      $httpBackend.flush();
    }));
  });
});