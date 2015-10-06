'use strict';

describe('UserService', function() {
  var userService, apiEndpoint, httpBackend;

  beforeEach(module('libraryUiApp'));

  beforeEach(inject(function(UserService, $window, _$httpBackend_, ENV){
    userService = UserService;
    httpBackend = _$httpBackend_;
    apiEndpoint = ENV.apiEndpoint;
    $window.sessionStorage.email = 'alisboa@thoughtworks.com';
  }));

  describe('#getUserGravatar', function() {
    var expectedGravatarUrl = 'http://www.gravatar.com/avatar/7aff7feba043b2651b7b0c099552c835';

    it('encrypt user email and get gravatar url', function() {
      var userGravatarUrl = userService.getGravatarFromUserEmail('alisboa@thoughtworks.com');
      expect(userGravatarUrl).toEqual(expectedGravatarUrl);
    });

    it('gets gravatar url from user session', function() {
      var userGravatarUrl = userService.getGravatarFromSession();
      expect(userGravatarUrl).toEqual(expectedGravatarUrl);
    });
  });

  describe('#getUserByEmail', function() {

    it('successfully gets user details by email from database', function(){

      var mockedEmail = 'fantunes@thoughtworks.com';
      httpBackend.expectGET(apiEndpoint.concat('/users/search/findByEmail?email=').concat(mockedEmail)).respond(200);

      userService.getUserByEmail(mockedEmail);

      httpBackend.flush();

    });
  });

});
