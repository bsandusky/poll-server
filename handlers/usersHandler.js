'use strict'
const bcrypt = require('bcryptjs')
const Users = require('../models/users.js')
const newUserObject = require('../helpers/newUserObject.js')

exports.authenticate = function (req, reply) {

  Users
    .findOne({'username': req.payload.username })
    .exec()
    .then((result) => {

      if (!result) {
        reply({error: "User not registered"})
      }

      if (!bcrypt.compareSync(req.payload.password, result.password)) {
        reply({error: "Incorrect password"})
      } else {
        reply({success: "Login successful"})
      }
    })
    .catch((err) => {
      throw err
    })
}

exports.signup = function (req, reply) {

  let user = newUserObject(req.payload)

  user.save()
    .then((user) => {
      reply(user)
    })
    //TODO: Change this error messaging
    .catch((err) => {
      reply({duplicate_record: "User already exists"})
      // throw err
    })
}
