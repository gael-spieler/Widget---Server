const db_booking = require('../models/booking');

module.exports = function(req, res, next) {
    // db_booking.findOne({
    //     service: req.body.service,
    //     provider: req.body.provider,
    //     start: req.body.start,
    //     end: req.body.end,
    // }).then(function (booking) {
    //     // make sure booking is unique
    //     if (booking) {
    //         return next({
    //             message: 'Time slot is already booked.'
    //         })
    //     }
    //     // if booking does not exist, create the booking
    //     let new_booking = req.body;
    //     new_booking.customer = req.user;
    //
    //     db_booking.create(new_booking).then(function (new_booking) {
    //         db_booking.findById(new_booking._id)
    //             .populate({
    //                 path: 'provider',
    //                 select: 'first_name'
    //             }).then(function (new_booking) {
    //             res.status(201).json(new_booking)
    //         })
    //     }).catch(next())
    // }).catch(next())

    let new_booking = req.body;
        new_booking.customer = req.user;
    db_booking.create(req.body).then(function(new_booking) {
        db_booking
            .findById(new_booking._id)
            .populate({
                path: 'provider',
                select: ['first_name', 'last_name', 'company', 'currency']
            })
            .populate({
                path: 'service',
                select: ['name', 'length', 'price']
            }).then(function(saved_booking) {
            res.status(201).json(saved_booking)
        })
    })
};

