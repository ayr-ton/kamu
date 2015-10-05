var jwt = require('jsonwebtoken');

var privateKey = 'superSecret';

var generate = function(email) {
2
	// sign with default (HMAC SHA256)
    var token = jwt.sign(email, privateKey, {
       expiresInMinutes: 1440 // expires in 24 hours
    });

	return token;
}

var verify = function(token) {

    return jwt.verify(token, privateKey, {
       expiresInMinutes: 1440 // expires in 24 hours
    });

}

exports.generate = generate;
exports.verify = verify;