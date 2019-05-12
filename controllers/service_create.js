// Import db_service
const db_service = require('../models/service')

module.exports = function(req, res, next) {
    console.log(req.body);

    db_service.create(req.body).then(function (new_service) {
        db_service
            .findById(new_service._id)
            .populate({
                path: 'provider',
                select: 'website'
            }).then(function (saved_service) {
            res.status(201).json(saved_service)
        })
    })
};
