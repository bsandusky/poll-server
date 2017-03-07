'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String,
  created_timestamp: Date,
  token: String
})

module.exports = mongoose.model('User', User)
