// Import db.js
const db = require('../db')
// Import mongoose from node_modules
const mongoose = require('mongoose')

let schema = mongoose.Schema
let ObjectId = schema.Types.ObjectId

// Create schema for message
const db_message = db.model('message', {
	__v: {
		type: Number,
		select: false
	},
	content: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	likes: {
		type: Number
	},
	channel: {
		type: ObjectId,
		ref: 'channel',
		required: [true, 'Channel is required']
	},
	user: {
		type: ObjectId,
		ref: 'user',
		required: [true, 'User is required']
	}
})

// Export
module.exports = db_message
