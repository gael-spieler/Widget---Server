// Import user
const db_provider = require('../models/provider')
const db_user = require('../models/user')

module.exports = function(req, res, next) {

	// transform email to lowercase
	if (req.body.email) {
		req.body.email = req.body.email.toLowerCase()
	}

	// if email is taken, reject, otherwise update user info
	db_user.findOne({
		email: req.body.email
	}).then(function (user) {
		console.log('user', user);
		// make sure email is unique
		if (user) {
			console.log('err')
			return next({
				message: 'Email address already exists.'
			})
		}
		// if email is taken, reject, otherwise update user info
		db_provider.findOne({
			email: req.body.email
		}).then(function (user) {
			console.log('user', user);
			// make sure email is unique
			if (user) {
				console.log('err')
				return next({
					message: 'Email address already exists.'
				})
			}

			db_user.findByIdAndUpdate(req.params.id,
				req.body,
				{
					new: true
				}).then(function (updated_provider) {
				res.status(200).json(updated_provider)
			}).catch(next)
		}).catch(next)
	}).catch(next)
};
