// Import db.js
const db = require('../db');

// Import mongoose from node_modules
const mongoose = require('mongoose');

let schema = mongoose.Schema;
let ObjectId = schema.Types.ObjectId;

const options = {};
options.timestamps =
    {createdAt: 'created_at'},
    {updatedAt: 'updated_at'};

const booking_schema = new schema({
    __v: {
        type: Number,
        select: false
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    service: {
        type: ObjectId,
        ref: 'service',
        required: true,
    },
    customer: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    provider: {
        type: ObjectId,
        ref: 'provider',
        required: true
    },
    booked_at: {
        type: Date,
        requested: true,
        default: Date.now()
    },
    approved_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    approved:{
        type: Boolean,
        required: true,
        default: true
    },
    cancelled: {
        type: Boolean,
        required: true,
        default: false
    },
    archived: {
        type: Boolean,
        requested: true,
        default: false
    },
    took_place_feedback_by_provider: {   // Provider has to send a feedback that the appointment actually took place
        type: Date
    },
    took_place_feedback_by_customer: { // Customer has to send a feedback that the appointment actually took place
        type: Date
    }
    },
    options);

const db_booking = new db.model('booking', booking_schema);


// Export
module.exports = db_booking;

