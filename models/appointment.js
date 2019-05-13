// TODO
//

// Import db.js
const db = require('../db');

// Import mongoose from node_modules
const mongoose = require('mongoose');

// Import user model (the model of the base schema that provider schema extends
const db_reservation = require('./user');

let schema = mongoose.Schema;

const options = {discriminatorKey: 'reservation_type'};


// defining the child schema's discriminatorKey and the schema itself
db_reservation.discriminator('appointment', new schema({
    service: {
        type: ObjectId,
        required: true,
    },
    customer: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    booked_at: {
        type: Date,
        requested: true,
        default: Date.now()
    },
    approved: {
        type: Boolean,
        required: true,
        default: true
    },
    approved_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    cancelled: {
        type: Boolean,
        required: true,
        default: false
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    },
    took_place_feedback_by_provider: {   // Provider has to send a feedback that the appointment actually took place
        type: Date
    },
    took_place_feedback_by_customer: { // Customer has to send a feedback that the appointment actually took place
        type: Date
    }
    },
    options)
);

const db_appointment = db.model('appointment');



// Export
module.exports = db_appointment;

