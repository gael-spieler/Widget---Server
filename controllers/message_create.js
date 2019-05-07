// Import db_message
const db_message = require('../models/message')

module.exports = function(req, res, next) {
	console.log(req.body);

	db_message.create(req.body).then(function(new_message) {
		db_message
			.findById(new_message._id)
			.populate({
				path: 'user',
				select: 'name'
			}).then(function(saved_message) {
				res.status(201).json(saved_message)
			})
	})

	// Only works on update
	// db_message.populate(req.body,
	// 	{
	// 		path: 'user',
	// 		select: 'name'
	// 	},
	// 	function(err, new_message) {
	// 		res.status(201).json(new_message)
	// 	}
	// )

}
