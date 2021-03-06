'use strict'
const bcrypt = require('bcryptjs')
const Users = require('../models/users.js')
const generateSessionToken = require('./generateSessionToken.js')

module.exports = (payload) => {

  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(payload.password, salt)

  let newUserObject = {};
  newUserObject['username'] = payload.username,
  newUserObject['password'] = hash,
  newUserObject['created_timestamp'] = Date.now()
  newUserObject['session_token'] = generateSessionToken()

  return new Users(newUserObject)
}
