// Import db_user
const db_user = require('../models/user')

module.exports = function(req, res, next) {
	db_user.findByIdAndRemove(req.params.id).then(function(deleted_user) {
		res.status(200).json(deleted_user)
	})
}
