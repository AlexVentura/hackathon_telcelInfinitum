/**
 * Building.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	// Enforce model schema in the case of schemaless databases
	schema: true,
	// Define a custom table name
	tableName: 'buildings',

	attributes: {
		description	: { type: 'string', required: true, unique: false },
		address		: { type: 'string', required: true, unique: false },
		latitude	: { type: 'float', unique: true },
		longitude	: { type: 'float', unique: true },
		ranking		: { type: 'integer', required: true, defaultsTo: 0 },
	}

};

