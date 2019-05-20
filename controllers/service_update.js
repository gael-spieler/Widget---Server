// Import message
const db_service = require('../models/service');

module.exports = function(req, res, next) {

    db_service.findByIdAndUpdate(req.params.service_id, req.body, {new: true})
        .then(function(updated_service) {
        res.status(200).json(updated_service)
    })

};


