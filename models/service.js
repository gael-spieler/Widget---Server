// Import db.js
const db = require('../db');

// Import mongoose from node_modules
const mongoose = require('mongoose');


let schema = mongoose.Schema;
let ObjectId = schema.Types.ObjectId;

const service_schema = new schema({
    __v: {
        type: Number,
        select: false
    },
    provider: {
        type: ObjectId,
        ref: 'provider',
        required: [true, 'Provider is required']
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    preparation_time: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Virtuals
service_schema.virtual('full_length').get(function () {
    return (this.duration * 60 * 1000) + (this.preparation_time * 60 * 1000);
});

const db_service = new db.model('service', service_schema);

// Export
module.exports = db_service;
