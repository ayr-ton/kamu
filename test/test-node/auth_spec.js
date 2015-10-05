'use strict';

var assert = require('assert');
var nock = require('nock');
var sinon = require('sinon');
var config = require('../../config');
var index = require('../../routes/index');
var tokenGenerator = require('../../auth/token-server-api');


describe('Protect UI and API with TOKEN', function() {

  describe('#Token generate', function () {

    it('should return a valid token', function () {

		var email =  'test@thoughtworks.com';

		var token = tokenGenerator.generate(email);

		var decoded = tokenGenerator.verify(token);

      	assert.equal(email, decoded);

    });

  });

  it('Persisting user request should have a token in header', function(done) {
    var mockedRequestForUsersAPI = { name: 'Test Cruz', email: 'test@thoughtworks.com' };
    var usersApiEndPoint = config.current().apiEndpoint;

    var sandbox = sinon.sandbox.create();
    sandbox.stub(tokenGenerator, 'generate').returns('a');

    var scope = nock(usersApiEndPoint, {
      reqheaders: {
        'token': 'a'
      }
    }).filteringRequestBody(function () {
        return '*';
      })
      .post('/users', '*')
      .reply(201);

    var userFromOkta = {
      nameID : 'test@thoughtworks.com',
      firstName: 'Test',
      lastName: 'Cruz'
    };

    var requestFromOkta = {user : userFromOkta};
    index.persistUser(requestFromOkta, {redirect: function(){
      scope.done();
      done();
    }});
    sandbox.restore();
  });
});
