var jwt = require('jsonwebtoken');

var secret = process.env.AUTH_SECRET || 'local_secret';

var sessionExpires = 60*60*24;

var generate = function(email) {

	var body = { 'email' : email};

	// sign with default (HMAC SHA256)
    var token = jwt.sign(body , secret, {
       expiresIn: sessionExpires
    });

	return token;
}

var verify = function(token) {

    return jwt.verify(token, secret, {
       expiresIn: sessionExpires
    });

}

exports.generate = generate;
exports.verify = verify;
