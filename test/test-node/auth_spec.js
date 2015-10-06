'use strict';

var assert = require('assert');
var nock = require('nock');
var sinon = require('sinon');
var config = require('../../config');
var index = require('../../routes/index');
var tokenGenerator = require('../../auth/token-server-api');


describe('Protect UI and API with TOKEN', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return a valid token', function () {
    var email, token, decoded;

    email =  'test@thoughtworks.com';
    token = tokenGenerator.generate(email);

    decoded = tokenGenerator.verify(token);

    assert.equal(email, decoded);
  });

  it('Persisting user request should have a token in header', function(done) {
    var usersApiEndPoint, scope, userFromOkta, requestFromOkta;

    usersApiEndPoint = config.current().apiEndpoint;

    sandbox.stub(tokenGenerator, 'generate').returns('a');

    scope = nock(usersApiEndPoint, {
      reqheaders: {
        'token': 'a'
      }
    }).filteringRequestBody(function () {
        return '*';
      })
      .post('/users', '*')
      .reply(201);

    userFromOkta = {
      nameID : 'test@thoughtworks.com',
      firstName: 'Test',
      lastName: 'Cruz'
    };

    requestFromOkta = {user : userFromOkta};
    index.persistUser(requestFromOkta, {redirect: function(){
      scope.done();
      done();
    }});
  });
});
