// Import db.js
const db = require('../db');

// Import mongoose from node_modules
const mongoose = require('mongoose');

// Import user model (the model of the base schema that provider schema extends
const db_user = require('./user');

let schema = mongoose.Schema;
let ObjectId = schema.Types.ObjectId;


const options = {discriminatorKey: 'user_type'};


// defining the child schema's discriminatorKey
const provider_schema = db_user.discriminator('provider', new schema({
    company: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        require: true
    },
    zip_code: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    currency: {
        type: String,
        required: true,
        default: 'EUR'
    },
    cancellation_time: {
        type: Number,
        required: true,
        default: 24
    },
    opening: {
        type: String,
        required: true,
        default: '09:00'
    },
    closing: {
        type: String,
        required: true,
        default: '17:00'
    }
    // days_off: {
    //     type: {
    //         day: String,
    //     },
    //     // enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    //     // default: [{day: "saturday"}, {day: 'sunday'}]
    //     default: {
    //         day: 'sunday'
    //     }
    // }
    },
    options)
);

const db_provider = db.model('provider');

// Export
module.exports = db_provider;

