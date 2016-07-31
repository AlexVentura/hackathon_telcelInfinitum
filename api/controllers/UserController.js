/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: (req, res) => {
		var p_email = req.param('email'),
			p_password = req.param('password'),
			p_confirmPassword = req.param('confirmPassword'),
			p_firstName = req.param('first_name'),
			p_lastName = req.param('last_name'),
			p_phoneNumber = req.param('phone_number'),
			p_state = req.param('state'),
			p_role = req.param('role');

		if (!p_email || !p_password || !p_confirmPassword || !p_firstName || !p_lastName || !p_phoneNumber || !p_state || !p_role)
			return res.json(401, { error: 'You need to provide all the required fields!' });

		if (p_password !== p_confirmPassword) {
			return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
		}

		User.create(req.body).exec(function (err, user) {
			if (err)
				return res.json(err.status, { err: err });

			// If user created successfuly we return user and token as response
			if (user) {
				// NOTE: payload is { id: user.id}
				res.json(200, { message: 'User created successfuly!' });
			}
		});
	}

};
