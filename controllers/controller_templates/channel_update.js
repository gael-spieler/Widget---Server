// Import db_channel
const db_channel = require('../models/channel')

module.exports = function(req, res, next) {
	db_channel.findByIdAndUpdate(
		req.params.id,
		{
			new: true
		}).then(function(channel_updated) {
		res.status(200).json(channel_updated)
	})
}
