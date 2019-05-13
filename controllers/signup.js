const db_user = require('../models/user');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

module.exports = function(req, res, next) {

	// transform email to lowercase
	if (req.body.email) {
		req.body.email = req.body.email.toLowerCase()
	}


	req.body.password = bcrypt.hashSync(req.body.password, 10);

	// if email is taken, reject, otherwise create the user
	db_user.findOne({
		email: req.body.email
	}).then(function(user) {
		// make sure email is unique
		if (user) {
			return next({
				message: 'User already exists'
			})
		}
		// if email does not exist, create the user
		db_user.create(req.body).then(function(user) {
			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			const msg = {
				to: user.email,
				from: process.env.EMAIL_ADDRESS,
				subject: 'Welcome to Platboo',
				// text: 'and easy to do anywhere, even with Node.js',
				html: '<strong>Dear ' + user.first_name + '<br/> thank you for signing up with Platboo! Happy booking!</strong>',
			};
			res.status(200).json(user)
			// res.redirect('/')

		}).catch(next)
	}).catch(next)

};
