// Import message
const db_service = require('../models/service');


module.exports = function(req, res, next) {
    // check if provider is authorized to get service, if yes: return service
    db_service.findById(req.params.id, function(err, service){
        if (service.provider != req.user.id){
            return next({
                message: "Service doesn't exist."
            })
        }
        service.archived = req.body.archived;
        service.save(function(err, updated_service){
            res.status(200).json(updated_service)
        })
    }).catch(next)
};


