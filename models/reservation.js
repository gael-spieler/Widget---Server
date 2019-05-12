// Import db.js
const db = require('../db');

// Import mongoose from node_modules
const mongoose = require('mongoose');

let schema = mongoose.Schema;

// set the discriminatorKey that will be used to differentiate between the reservations
const options = {discriminatorKey: 'reservation_type'};
options.timestamps =
    {createdAt: 'created_at'},
    {updatedAt: 'updated_at'};


// base user schema
const reservation_schema = new schema({
    __v: {
        type: Number,
        select: false,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        require: true
    },
    archived: {
        type: Boolean,
        required: true,
        default: true
    }
    },
    options);


const db_reservation = db.model('reservation', reservation_schema);


// Export
module.exports = db_user;

