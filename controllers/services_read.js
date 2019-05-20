const db_service = require('../models/service')

module.exports = function(req, res, next) {
    db_service.find({provider:  req.body.provider})
        .then(function(all_services_of_provider){
            res.status(200).json(all_services_of_provider)
        })
};

