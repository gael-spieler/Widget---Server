// Import db_message
const db_service = require('../models/service')

module.exports = function(req, res, next) {
    db_service
        .find({provider: req.params.id, archived: false})
        .then(function(services) {
            res.status(200).json(services)
        })
}
