// Import db_user
const db_user = require('../models/user')

module.exports = function(req, res, next) {
	db_user.findById(req.params.id).then(function(user) {
		res.json(user)
	})
}
