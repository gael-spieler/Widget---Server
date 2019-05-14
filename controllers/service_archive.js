// Import message
const db_service = require('../models/service');


module.exports = function(req, res, next) {

    db_service.findById(req.params.id, function(err, service){
        console.log(service.provider);
        console.log(req.headers.user_id);
        if (service.provider != req.headers.user_id){
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


