'use strict'
const Users = require('../models/users.js')
const generateSessionToken = require('./generateSessionToken.js')

module.exports = function (user) {
  return Users
    .findByIdAndUpdate(user._id, {$set: {'session_token': generateSessionToken()}}, {new: true})
}
