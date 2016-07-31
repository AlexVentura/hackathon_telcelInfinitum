/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

// We don't want to store password with out encryption
var bcrypt = require('bcrypt');

module.exports = {

	// Enforce model schema in the case of schemaless databases
	schema: true,
	// Define a custom table name
	tableName: 'users',
	// Disable the timestamps for this model
	// autoCreatedAt: false,
	// autoUpdatedAt: false,

	attributes: {
		// username			: { type: 'string', unique: true, minLength: 5, maxLength: 15 },
		email				: { type: 'email', required: true, unique: true },
		encrypted_password	: { type: 'string' },
		first_name			: { type: 'string', required: true },
		last_name			: { type: 'string', required: true },
		phone_number		: { type: 'string', required: false },
		state				: { type: 'string', required: false },
		role				: { type: 'integer', required: true, min: 1, max: 2, defaultsTo: 1 },

		// We don't wan't to send back encrypted password either
		toJSON: function () {
			var obj = this.toObject();

			delete obj.encrypted_password;
			delete obj._csrf;

			return obj;
		}
	},

	// Here we encrypt password before creating a User
	beforeCreate : function (values, next) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) return next(err);

			bcrypt.hash(values.password, salt, function (err, hash) {
				if (err) return next(err);

				values.encrypted_password = hash;

				next();
			});
		});
	},

	comparePassword : function (password, user, callback) {
		bcrypt.compare(password, user.encrypted_password, function (err, match) {
			if (err) return callback(err);

			if (match) {
				callback(null, true);
			} else {
				callback(err);
			}
		});
	}

};
