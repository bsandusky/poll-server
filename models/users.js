'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_timestamp: Date,
  session_token: {type: String, unique: true }
})

module.exports = mongoose.model('User', User)
