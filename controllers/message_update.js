// Import message
const message = require('../models/message')

module.exports = function(req, res, next) {
	message.findByIdAndUpdate(req.params.id,
		req.body,
		{
			new: true
		}).then(function(updated_message) {
		res.status(200).json(updated_message)
	})
}
