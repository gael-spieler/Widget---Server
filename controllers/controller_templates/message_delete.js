// Import db_message
const db_message = require('../models/message')

module.exports = function(req, res, next) {
	db_message.findByIdAndRemove(req.params.id).then(function(deleted_message) {
		res.status(200).json(deleted_message)
	})
}
