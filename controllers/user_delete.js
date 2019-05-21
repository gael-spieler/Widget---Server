// Import db_user
const db_user = require('../models/user')
// TODO: delete connected data of user eg. services, bookings etc.
module.exports = function(req, res, next) {
	db_user.findByIdAndRemove(req.user._id).then(function(deleted_user) {
		res.status(200).json(deleted_user)
	})
};
