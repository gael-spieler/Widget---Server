// Import db_channel
const db_channel = require('../models/channel')

module.exports = function(req, res, next) {
	db_channel.findByIdAndRemove(req.params.id).then(function(deleted_channel) {
		res.status(200).json(deleted_channel)
	})
}
