const passport = require('passport');
const db_user = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
	passport.authenticate('local', {session: false}, function(err, user) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return next({
				message: 'Email or password is not valid'
			})
		}
		req.logIn(user, {session: false}, function(err) {
			if (err) {
				return next(err)
			}

			// generate a signed son web token with the contents of user object and return it in the response
			const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
			return res.status(200).json({user, token});
		});
	})(req, res, next)
};
