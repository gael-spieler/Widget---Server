const db_provider = require('../models/provider');
const bcrypt = require('bcrypt');

module.exports = function(req, res, next) {

    // transform email to lowercase

    if (req.body.email) {
        req.body.email = req.body.email.toLowerCase()
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    // if email is taken, reject, otherwise create the provider

    db_provider.findOne({
        email: req.body.email
    }).then(function(provider) {
        // make sure email is unique
        if (provider) {
            return next({
                message: 'Provider already exists'
            })
        }
        // if email does not exist, create the provider
        db_provider.create(req.body).then(function(provider) {
            res.status(200).json(provider);
            // res.redirect('/')
        }).catch(next)
    }).catch(next)
};
