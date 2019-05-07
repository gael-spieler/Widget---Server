const db_user = require('../models/user')

module.exports = function(req, res, next) {

	req.logout()
	req.session.destroy(function(err) {
		if (err) {
			return next(err)
		}
		res.clearCookie('connect.sid')
		res.redirect('/login')
		// res.status(200).json({
		// 	message: 'You are logged out'
		// })
	})

}
