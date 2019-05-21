const db_service = require('../models/service')

module.exports = function(req, res, next) {
    db_service.find({provider:  req.user._id, _id: req.params.service_id})
        .then(function(service){
            res.status(200).json(service)
        })
};

