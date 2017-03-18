'use strict'
const Users = require('../models/users.js')

module.exports = function (req, reply) {

  Users
    .findOne({'session_token': req.headers.authorization })
    .then((result) => {
      if (!result) {
        reply({message: "Authorization error"})
      } else {
        reply(result)
      }
    })
    .catch((err) => {
      throw err
    })
}
