const db_booking = require('../models/booking')

module.exports = function(req, res, next) {
    let day = new Date(req.query.date)

    let year = day.getFullYear();
    let month = day.getMonth();
    let date = day.getDate();

    let result = [];
    db_booking.find({provider: req.params.provider_id})
        .then(function(bookings){
            bookings.forEach(function(booking){
                if (booking.start.getFullYear() === year &&
                    booking.start.getMonth()=== month &&
                    booking.start.getDate() === date){
                    result.push(booking)
                }
            });

            res.status(200).json(result)
        })
};

