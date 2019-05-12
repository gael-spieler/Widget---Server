// Import db_channel
const db_channel = require('../models/channel')

module.exports = function(req, res, next) {
	db_channel.create(req.body).then(function(new_channel) {
		res.status(201).json(new_channel)
	})
}
