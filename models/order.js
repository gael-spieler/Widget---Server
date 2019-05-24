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

const order_schema = new schema({
    __v: {
        type: Number,
        select: false
    },
    provider: {
        type: ObjectId,
        required: true
    },
    customer: {
        type: ObjectId,
        required: true
    },
    sku_id: {
        type: String,
        required: true
    },
    stripe_order_id: {
        type: String,
        required: true
    }
    },
    options);


const db_order= new db.model('order', order_schema);

// Export
module.exports = db_order;
