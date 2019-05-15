const db_appointment = require('../models/appointment');

module.exports = function(req, res, next) {
    db_appointment.create(req.body).then(function(new_appointment) {
        res.status(201).json(new_appointment)
    })
};
