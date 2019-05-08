// Import db_customer
const db_customer = require('../models/customer')

module.exports = function(req, res, next) {
	db_customer.create(req.body).then(function(new_customer) {
		res.status(201).json(new_customer)
	})
}
