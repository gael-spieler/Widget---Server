// Import db_provider
const db_provider = require('../models/provider')

module.exports = function(req, res, next) {
    db_provider.findById(req.query.provider_id).then(function(provider) {
        let provider_to_send_to_widget = {
            first_name: provider.first_name,
            last_name: provider.last_name,
            company: provider.company,
            currency: provider.currency,
            cancellation_time: provider.cancellation_time
        };
        res.status(200).json(provider_to_send_to_widget)
    })
}
