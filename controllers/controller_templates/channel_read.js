// Import db_channel
const db_channel = require('../models/channel')

module.exports = function(req, res, next) {
	db_channel.findById(req.params.id).then(function(channel) {
		res.status(200).json(channel)
	})
}
