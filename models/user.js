// Import db.js
const db = require('../db');

// Import mongoose from node_modules
const mongoose = require('mongoose');

let schema = mongoose.Schema;

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
				const expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i;
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
	stripe_customer: {
		type: String,
		required: true, 
		default: 'abcdefghi'
	},
	agreed_to_terms: {
		type: Boolean,
		// required: true,
		validate: [{
			validator: function(agreement_to_terms){
				return agreement_to_terms === true;
			},
			message: 'You have to agree to the terms and conditions.'
		}],
	}},
	options);

// Virtuals
user_schema.virtual('full_name').get(function () {
	return this.first_name + ' ' + this.last_name;
});

const db_user = db.model('user', user_schema);


// Export
module.exports = db_user;


