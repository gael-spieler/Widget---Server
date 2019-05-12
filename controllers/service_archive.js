// Import message
const db_service = require('../models/service')

module.exports = function(req, res, next) {
    db_service.findByIdAndUpdate(req.params.id,
        req.body,
        {
            new: true
        }).then(function(archived_service) {
        res.status(200).json(archived_service)
    })
}
