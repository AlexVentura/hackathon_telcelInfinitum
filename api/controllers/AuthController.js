/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	login: function (req, res) {
		var p_email = req.param('email');
		var p_password = req.param('password');

		if (!p_email || !p_password) {
			return res.json(401, { err: 'Email and Password required!' });
		}

		User.findOne({ email: p_email }, function (err, resultUser) {
			if (!resultUser) {
				return res.json(401, { err: 'Invalid email or password' });
			}

			console.log('▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸', resultUser);

			User.comparePassword(p_password, resultUser, function (err, validUser) {
				if (err) {
					console.log('▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸', err);
					return res.json(403, { err: 'Forbidden!' });
				}

				if (!validUser) {
					return res.json(401, { err: 'Invalid email or password' });
				} else {
					res.json({
						email: validUser.email,
						token: jwToken.issueToken({id : validUser.id })
					});
				}
			});
		});
	}

};
