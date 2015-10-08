'use strict';

var assert = require('assert');
var nock = require('nock');
var sinon = require('sinon');
var config = require('../../config');
var index = require('../../routes/index');
var tokenGenerator = require('../../auth/token-server-api');

describe('json web token authentication', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('generates a valid token', function () {

    var email, token, decoded;

    email =  'test@thoughtworks.com';

    token = tokenGenerator.generate(email);

    decoded = tokenGenerator.verify(token);

    assert.equal(email, decoded.email);
  });

  it('adds the token in the request header (when persisting the user)', function(done) {
    var usersApiEndPoint, scope, userFromOkta, requestFromOkta;

    usersApiEndPoint = config.current().apiEndpoint;

    sandbox.stub(tokenGenerator, 'generate').returns('a');
    scope = nock(usersApiEndPoint, {
      reqheaders: {
        'x-token': 'a'
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
    index.persistUser(requestFromOkta, {
      redirect: function(){
        scope.done();
        done();
      }});
  });
});
