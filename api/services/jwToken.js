/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken'),
	tokenSecret = "a5ec9036f0e81ec8a656b766d3758e487ba19ad4f5cfb57e75963d431c7dafe6f3f1f121330488ecc25d06dcaa3e21ba58f0bf41fce77b87dcaf3184c0495996";
	// tokenSecret = process.env.TOKEN_SECRET || "oursecret" // Secret string which will be used to sign the token

// Generates a new token based on payload we want to put on it
module.exports.issueToken = function(payload) {
	return jwt.sign(
		payload, // This is the payload we want to put inside the token
		tokenSecret, // Secret string which will be used to sign the token
		{
			// jsonwebtoken: expiresInMinutes and expiresInSeconds is deprecated. Use "expiresIn" expressed in seconds.
			// expiresInMinutes : 180 // Token Expire time
			expiresIn : 60*60*24*30
		}
	);
};

// Verifies token on a request
// Here we verify that the token we received on a request hasn't be tampered with.
module.exports.verifyToken = function(token, verified)
{
	return jwt.verify(
		token, // The token to be verified
		tokenSecret, // Same token we used to sign
		{}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
		verified // The callback to be call when the verification is done. Pass errors or decoded token to callback
	);
};

// To get the logged in user without verifycation of its authenticity
// boolean: showResult tells the function whether the result is returned or not
module.exports.decode = function(token, showResult)
{
	return jwt.decode(
		token, // The token to be verified
		{complete: showResult}
	);
};
