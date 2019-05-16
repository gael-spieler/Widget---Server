const db_service = require('../models/service')

// Returns active services of provider
module.exports = function(req, res, next) {
    db_service.find({provider: req.params.provider_id, archived: false})
        .then(function(active_services_of_provider) {
            res.status(200).json(active_services_of_provider)
        })
};
