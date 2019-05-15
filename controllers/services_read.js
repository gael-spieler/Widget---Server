// Import db_message
const db_service = require('../models/service')

module.exports = function(req, res, next) {

    if(req.query.archived === 'true'){
        db_service.find({provider:  req.body.provider, archived: true})
            .then(function(archived_services_of_provider){
                res.status(200).json(archived_services_of_provider)
            })
    }
    else if (req.query.archived === 'false'){
        db_service.find({provider: req.body.provider, archived: false})
            .then(function(active_services_of_provider) {
                res.status(200).json(active_services_of_provider)
            })
    } else if (req.query.archived === 'all') {
        db_service.find({provider: req.body.provider})
            .then(function(all_services_of_provider){
                res.status(200).json(all_services_of_provider)
            })
    } return next({
        message: 'Please specify archived/not archived/all'
    })
};
