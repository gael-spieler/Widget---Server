// Import message
const db_service = require('../models/service');

module.exports = function(req, res, next) {
    // Archives or unarchives service based on service ID, and query parameters "archived=true/false". Every other request is unauthorized.
    if(req.query.archived === 'true'){
        db_service.findByIdAndUpdate(req.params.service_id, req.query, {new: true}, function(err, archived_service){
            res.status(201).json(archived_service)
        }).catch(next())
    }else if(req.query.archived === 'false'){
        db_service.findByIdAndUpdate(req.params.service_id, req.query, {new: true}, function(err, unarchived_service){
            res.status(201).json(unarchived_service)
        }).catch(next())
    }else {
        return next({
            message: 'Unauthorized'
        })
    }
};


