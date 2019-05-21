const db_service = require('../models/service')

module.exports = function(req, res, next) {
    console.log('request user', req.user)
    db_service.find({provider:  req.user})
        .then(function(all_services_of_provider){
            res.status(200).json(all_services_of_provider)
        })
};
