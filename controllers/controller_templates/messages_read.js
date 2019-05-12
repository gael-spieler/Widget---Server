// Import db_message
const db_message = require('../models/message')

module.exports = function(req, res, next) {

	let query = {}

	if (req.query.channel) {
		query = {'channel' : req.query.channel}
	}

	db_message
	.find(query)
	.populate({
		path: 'channel',
		select: 'name'
	})
	.populate({
		path: 'user',
		select: 'name'
	})
	.then(function(messages) {
		res.status(200).json(messages)
	})
}
