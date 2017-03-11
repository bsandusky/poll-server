'use strict'

const Users = require('../models/users.js')

module.exports = (payload) => {

  let newUserObject = {};
  newUserObject['username'] = payload.username,
  newUserObject['password'] = payload.password,
  newUserObject['created_timestamp'] = Date.now()

  return new Users(newUserObject)
}
