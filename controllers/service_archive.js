// Import message
const db_service = require('../models/service')

module.exports = function(req, res, next) {
    db_service.findById(req.params.id, function(err, service){
        service.archived = req.body.archived;
        service.save(function(err, updated_service){
            res.status(200).json(updated_service)
        })
    })
};


