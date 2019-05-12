// Import db.js
const db = require('../db');

// Import mongoose from node_modules
const mongoose = require('mongoose');

let schema = mongoose.Schema;
let ObjectId = schema.Types.ObjectId;

// set the discriminatorKey that will be used to differentiate between the users
const options = {discriminatorKey: 'user_type'};
options.timestamps =
	{createdAt: 'created_at'},
	{updatedAt: 'updated_at'};


// base user schema
const user_schema = new schema({
	__v: {
		type: Number,
		select: false
	},
	last_logged_in: {
		type: Date
	},
	first_name: {
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: [{
			validator: function(email){
				const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
				return expression.test(String(email).toLowerCase())},
			message: 'Invalid email address'
		}]
	},
	password: {
		type: String,
		required: function(){
			return this.google == null
		},
		validate: [{
			validator: function(password){
				const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
				return expression.test(String(password))},
			message: 'Password must be different'
		}]
	},
	status: {
		type: String,
		default: 'Online'
	},
	google: {
		id: {
			type: String
		}
	},
	stripe_token: {
		type: String,
		// required: true,
		default: "abcd1234!@£$"
	},
	agreed_to_terms: {
		type: Boolean,
		// required: true,
		validate: [{
			validator: function(agreement_to_terms){
				return agreement_to_terms === true;
			},
			message: 'Please agree to the terms and conditions.'
		}],
		// default: true
	}},
	options);

// Virtuals
user_schema.virtual('full_name').get(function () {
	return this.first_name + ' ' + this.last_name;
});

const db_user = db.model('user', user_schema);


// Export
module.exports = db_user;


