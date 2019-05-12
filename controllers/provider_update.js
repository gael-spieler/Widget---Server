// Import user
const provider = require('../models/provider')

module.exports = function(req, res, next) {
    provider.findByIdAndUpdate(req.params.id,
        req.body,
        {
            new: true
        }).then(function(updated_provider) {
        res.status(200).json(updated_provider)
    })
}
