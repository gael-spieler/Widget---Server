const db_service = require('../models/service');

module.exports = function(req, res, next) {
    // Checks for service parameters to prevent creating duplicates.
    db_service.findOne({
        name : req.body.name,
        duration : req.body.duration,
        price : req.body.price,
        preparation_time : req.body.preparation_time,
        provider: req.user
    }).then(function(service) {
        // make sure service is unique
        if (service) {
            return next({
                message: 'Service already exists'
            })
        }
        // if service does not exist, create the service
        const service_to_add = req.body;
        service_to_add.provider = req.user;
        db_service.create(service_to_add).then(function(new_service) {
            res.status(200).json(new_service)

        }).catch(next)
    }).catch(next)
};
