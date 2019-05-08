// Import db_customer
const db_customer = require('../models/customer')

module.exports = function(req, res, next) {

    let customerid = req.query.customer_id

    // this is temporary
    customerid = '5cd27d19b20566227be2a79e'
    let booking = req.body.booking
    console.log('booking', booking)
    
    db_customer.findOneAndUpdate( {_id:customerid}, {$push: {booking:booking}},{new: true})
        .then(function(new_booking) {
        res.status(200).json(new_booking)
	})
}
