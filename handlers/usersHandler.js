'use strict'
const bcrypt = require('bcryptjs')
const Users = require('../models/users.js')
const newUserObject = require('../helpers/newUserObject.js')

exports.login = function (req, reply) {
  Users
    .findOne({'username': req.payload.username })
    .exec()
    .then((result) => {

      if (!result) {
        reply({error: "User not registered"})
      }

      if (bcrypt.compareSync(req.payload.password, result.password)) {
        reply({success: "Login successful"})
      } else {
        reply({error: "Incorrect password"})
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
    .catch((err) => {
      throw err
    })
}
