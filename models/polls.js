'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pollOption = new Schema({
	option: String,
	count: Number,
})

const Poll = new Schema({
	created_by: Number,
	created_timestamp: Date,
	last_updated: Date,
	active: Boolean,
	poll_stimulus: String,
	poll_options: [pollOption]
})

module.exports = mongoose.model('Poll', Poll)
