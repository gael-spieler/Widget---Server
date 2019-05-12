const db_service = require('../models/service');

// Import mongoose from node_modules
const mongoose = require('mongoose');
let schema = mongoose.Schema;
let ObjectId = schema.Types.ObjectId;

module.exports = function(req, res, next) {
    console.log('request body:', req.body);

    // if service already exists, reject, otherwise create the service

    db_service.findOne({
        name : req.body.name,
        duration : req.body.duration,
        price : req.body.price,
        preparation_time : req.body.preparation_time,
        provider : req.body.provider
    }).then(function(service) {
        // make sure service is unique
        if (service) {
            return next({
                message: 'Service already exists'
            })
        }
        // if service does not exist, create the service
        db_service.create(req.body).then(function(service) {
            res.status(200).json(service)
            // res.redirect('/')

        }).catch(next)
    }).catch(next)

    // save to database

    // res

}
