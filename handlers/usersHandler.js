'use strict'
const Users = require('../models/users.js')
const newUserObject = require('../helpers/newUserObject.js')

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