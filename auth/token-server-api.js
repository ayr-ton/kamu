var jwt = require('jsonwebtoken');

var privateKey = 'superSecret';

var sessionExpires = 60*60*24;

var generate = function(email) {

	var body = { 'email' : email};

	// sign with default (HMAC SHA256)
    var token = jwt.sign(body , privateKey, {
       expiresIn: sessionExpires
    });

	return token;
}

var verify = function(token) {

    return jwt.verify(token, privateKey, {
       expiresIn: sessionExpires 
    });

}

exports.generate = generate;
exports.verify = verify;