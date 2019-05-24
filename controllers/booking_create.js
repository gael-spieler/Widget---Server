const db_booking = require('../models/booking');
const db_user = require('../models/user');
const sgMail = require('@sendgrid/mail');

module.exports = function(req, res, next) {

    db_booking.findOne({
        service: req.body.service,
        provider: req.body.provider,
        start: req.body.start,
        end: req.body.end,
    }).then(function (booking) {

    // make sure booking is unique
    if (booking) {
        return next({
            message: 'Time slot is already booked.'
        })
    }

    db_booking.create(req.body).then(function(new_booking) {
        db_booking
            .findById(new_booking._id)
            .populate({
                path: 'provider',
                select: ['first_name', 'last_name', 'company', 'currency', 'cancellation_time', 'email']
            })
            .populate({
                path: 'service',
                select: ['name', 'length', 'price']
            }).then(function(saved_booking) {

                db_user.findById(req.body.customer).then(function(user) {
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg_to_customer = {
                        to: user.email,
                        from: process.env.EMAIL_ADDRESS,
                        subject: 'You booked an appointment with ' + saved_booking.provider.company + '!',
                        // text: 'and easy to do anywhere, even with Node.js',
                        html: '<strong>Dear ' + user.first_name + ', thank you for booking with Platboo!  You booked ' + saved_booking.service.name + ' with '+ saved_booking.provider.company +' on ' + saved_booking.start + '.  Happy booking!</strong>',
                    };

                    const msg_to_provider = {
                        to: saved_booking.provider.email,
                        from: process.env.EMAIL_ADDRESS,
                        subject: "You have a new booking!",
                        // text: 'and easy to do anywhere, even with Node.js',
                        html: '<strong>Dear ' + saved_booking.provider.first_name + ', ' + user.first_name + ' ' +  user.last_name +' has just booked an appointment with you! Booking details: ' + saved_booking.service.name + ' on ' + saved_booking.start + '.  Best regards, Platboo Team!</strong>',
                    };

                    sgMail.send(msg_to_customer);
                    sgMail.send(msg_to_provider);
                    res.status(201).json(saved_booking)
                });

        })
    })
})};
