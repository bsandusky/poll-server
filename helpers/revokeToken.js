'use strict'
const Users = require('../models/users.js')

module.exports = function (user) {
  return Users
    .findByIdAndUpdate(user._id, {$set: {'session_token': null}}, {new: true})
}
