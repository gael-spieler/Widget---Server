// Import user
const user = require('../models/user')

module.exports = function(req, res, next) {
	user.findByIdAndUpdate(req.params.id,
		req.body,
		{
			new: true
		}).then(function(updated_user) {
		res.status(200).json(updated_user)
	})
}
