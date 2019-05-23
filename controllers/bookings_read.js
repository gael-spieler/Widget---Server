const db_booking = require('../models/booking')

module.exports = function(req, res, next) {
    db_booking
        .find({provider: req.user._id})
        .populate({
            path: 'customer',
            select: ['first_name', 'last_name']
        })
        .populate({
            path: 'service',
            select: ['name', 'length', 'price']
        })
        .then(function(bookings){
            res.status(200).json(bookings)
        })
};

