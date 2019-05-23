const db_service = require('../models/service');
const db_provider = require('../models/provider');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = function(req, res, next) {
    // Checks for service parameters to prevent creating duplicates.
    db_service.findOne({
        name : req.body.name,
        duration : req.body.duration,
        price : req.body.price,
        preparation_time : req.body.preparation_time,
        provider: req.user
    }).then(function(service) {
        // make sure service is unique
        if (service) {
            return next({
                message: 'Service already exists'
            })
        }
        // if service does not exist, create the service

        db_provider.findById(req.user).then(function (provider) {

            stripe.skus.create({
                currency: provider.currency,
                inventory: {'type': 'infinite'},
                price: req.body.price,
                product: process.env.STRIPE_PRODUCT_KEY,
                attributes: {"name": req.body.name, 'provider_id' : provider.id}
            }, function (err, sku){
                if (err) {
                    console.log('err', err);
                    res.status(400).json({
                        message: 'Error creating skus'
                    })
                }

                req.body.stripe = sku.id;
                req.body.provider = req.user;

                db_service.create(req.body).then(function(new_service) {
                    res.status(200).json(new_service)
                }).catch(next)
            }).catch(next)
        }).catch(next)
    }).catch(next)
};
