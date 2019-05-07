// Import db_user
const db_user = require('../models/user')

module.exports = function(req, res, next) {
	db_user
	.find({})
	.select({
		created: 0
	})
	.then(function(users) {
		res.status(200).json(users)
	})
}
