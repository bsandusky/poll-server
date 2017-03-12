'use strict'
const bcrypt = require('bcryptjs')
const Users = require('../models/users.js')

module.exports = (payload) => {

  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(payload.password, salt)

  let newUserObject = {};
  newUserObject['username'] = payload.username,
  newUserObject['password'] = hash,
  newUserObject['created_timestamp'] = Date.now()

  return new Users(newUserObject)
}
