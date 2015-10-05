var assert = require("assert");

describe('Protect UI and API with TOKEN', function() {

  describe('#Token generate', function () {

    it('should return a valid token', function () {

		var tokenGenerator = require('../../auth/token-server-api');

		var email =  "test@thoughtworks.com";

		var token = tokenGenerator.generate(email);

		var decoded = tokenGenerator.verify(token);

      	assert.equal(email, decoded);

    });

  });

});
