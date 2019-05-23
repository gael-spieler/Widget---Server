const db_user = require('../models/user');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = function(req, res, next) {

	// transform email to lowercase
	if (req.body.email) {
		req.body.email = req.body.email.toLowerCase()
	}


	req.body.password = bcrypt.hashSync(req.body.password, 10);

	// if email is taken, reject, otherwise create the user
	db_user.findOne({
		email: req.body.email
	}).then(function (user) {
		// make sure email is unique
		if (user) {
			return next({
				message: 'Provider already exists'
			})
		}

		// create a customer on stripe
		stripe.customers.create({email: req.body.email}, function (err, customer) {
			if (err) {
				console.log('err', err);
				res.status(400).json({
					message: 'Error creating user'
				})
			}
			req.body.stripe = {
				customer: customer.id
			}

			// if email does not exist, create the user
			db_user.create(req.body).then(function (user) {

				// Send welcome email
				sgMail.setApiKey(process.env.SENDGRID_API_KEY);
				const msg = {
					to: user.email,
					from: process.env.EMAIL_ADDRESS,
					subject: 'Welcome to Platboo',
					// text: 'some text',
					html: '<strong>Dear ' + user.first_name + '<br/> thank you for signing up with Platboo! Happy booking!</strong>',
				};
				sgMail.send(msg);

				res.status(200).json(user)
			}).catch(next)
		})
	})
}
