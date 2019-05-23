const db_provider = require('../models/provider')

module.exports = function(req, res, next) {
    db_provider.findById(req.user._id)
        .then(function(provider){
            res.status(200).json(provider)
        })
};

