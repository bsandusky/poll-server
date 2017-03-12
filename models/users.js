'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_timestamp: Date,
  //token: String
})

module.exports = mongoose.model('User', User)
