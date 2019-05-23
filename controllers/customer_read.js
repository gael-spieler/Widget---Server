// Import db_user
const db_user = require('../models/user');
const db_booking = require('../models/booking');

module.exports = function(req, res, next) {

	db_user.findById(req.params.customer_id)
		.then(function (customer) {

		let result = {
			name: customer.full_name,
		};

		db_booking.find({provider: req.user._id, customer: customer._id})
			.then(function(bookings){
				console.log('bookings', bookings[0].service);
				result.bookings = bookings;
				res.status(201).json(result)
			})
	})
};

