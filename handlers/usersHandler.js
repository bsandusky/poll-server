'use strict'
const bcrypt = require('bcryptjs')
const Users = require('../models/users.js')
const newUserObject = require('../helpers/newUserObject.js')
const updateToken = require('../helpers/updateToken.js')
const revokeToken = require('../helpers/revokeToken.js')

exports.signup = function (req, reply) {

  let user = newUserObject(req.payload)

  user.save()
    .then((user) => {
      reply(user)
    })
    //TODO: Change this error messaging
    .catch((err) => {
      reply({ message: "User already exists" })
      // throw err
    })
}

exports.login = function (req, reply) {

  Users
    .findOne({'username': req.payload.username })
    .exec()
    .then((result) => {

      if (!result) {
        reply({ message: "User not registered" })
      }

      if (!bcrypt.compareSync(req.payload.password, result.password)) {
        reply({ message: "Incorrect password" })
      }

      return result
    })
    .then(updateToken)
    .then((result) => {
      reply({ message: "Login successful", uid: result._id, sid: result.session_token })
    })
    .catch((err) => {
      throw err
    })
}

exports.logout = function (req, reply) {

  Users
    .findById(req.payload.uid)
    .exec()
    .then((result) => {
      return result
    })
    .then(revokeToken)
    .then((result) => {
      reply({ message: "Logout successful", uid: result._id, sid: result.session_token })
    })
    .catch((err) => {
      throw err
    })
}
