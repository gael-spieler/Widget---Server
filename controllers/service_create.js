const db_service = require('../models/service');

module.exports = function(req, res, next) {

    db_service.findOne({
        name : req.body.name,
        duration : req.body.duration,
        price : req.body.price,
        preparation_time : req.body.preparation_time,
        provider: req.headers.user_id
    }).then(function(service) {
        // make sure service is unique
        if (service) {
            return next({
                message: 'Service already exists'
            })
        }
        // if service does not exist, create the service
        const new_service = req.body;
        new_service.provider = req.headers.user_id;
        db_service.create(req.body).then(function(service) {

            res.status(200).json(service)
            // res.redirect('/')

        }).catch(next)
    }).catch(next)
};
