/**
 * BuildingHasRating.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	// Enforce model schema in the case of schemaless databases
	schema: true,
	// Define a custom table name
	tableName: 'buildings_have_ratings',

	attributes: {
		score		: { type: 'integer', required: true, defaultsTo: 0 },
		feedback	: { type: 'string', required: true, unique: false },

		building_id	: { model: 'building', required: true },
		user_id		: { model: 'user', required: true }
	}

};

