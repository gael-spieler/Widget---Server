const db_booking = require('../models/booking');
const db_user = require('../models/user');
const sgMail = require('@sendgrid/mail');

module.exports = function(req, res, next) {
    let new_booking = req.body;
        new_booking.customer = req.user;
    db_booking.create(req.body).then(function(new_booking) {
        db_booking
            .findById(new_booking._id)
            .populate({
                path: 'provider',
                select: ['first_name', 'last_name', 'company', 'currency', 'cancellation_time']
            })
            .populate({
                path: 'service',
                select: ['name', 'length', 'price']
            }).then(function(saved_booking) {

                db_user.findById(req.user._id).then(function(user) {
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: user.email,
                        from: process.env.EMAIL_ADDRESS,
                        subject: 'You booked an appointment with ' + saved_booking.provider.company + '!',
                        // text: 'and easy to do anywhere, even with Node.js',
                        html: '<strong>Dear ' + user.first_name + '<br/> thank you for booking with Platboo!  Booking details: ' + saved_booking.service.name + ' on : ' + saved_booking.start + '. You can cancel your booking free of charge '+ saved_booking.provider.cancellation_time +' hours before your appointment by clicking on the following link: wwww.linklinklink.com/sometokenthingshere.  Happy booking!</strong>',
                    };
                    sgMail.send(msg);
                    res.status(201).json(saved_booking)
                });
        })
    })
};
