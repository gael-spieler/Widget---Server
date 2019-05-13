// Import db_user
const db_reservation = require('../models/reservation')

module.exports = function(req, res, next) {
    db_reservation.create(req.body).then(function(new_reservation) {
        res.status(201).json(new_reservation)
    })
}
