const db_booking = require('../models/booking')

// Returns list of all bookings 
module.exports = function(req, res, next) {
    db_booking.find({provider:req.params.provider_id})
        .then(function(bookings) {
            res.status(200).json(bookings)
        })
};