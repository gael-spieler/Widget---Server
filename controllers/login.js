const passport = require('passport');
const db_user = require('../models/user');

module.exports = function(req, res, next) {

	//
	passport.authenticate('local', function(err, user) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return next({
				message: 'Email or password is not valid'
			})
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err)
			}
			return res.status(200).json(user)
			// res.redirect('/')

		})
	})(req, res, next)

}
