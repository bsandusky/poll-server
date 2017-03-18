'use strict'

const pollsHandler = require('../handlers/pollsHandler')
const usersHandler = require('../handlers/usersHandler')
const validateToken = require('../helpers/validateToken.js')

module.exports = [

  // POLLS Routes
  {
    method: 'GET',
    path: '/api/v1/polls',
    handler: pollsHandler.find
  },
  {
    method: 'GET',
    path: '/api/v1/polls/{id}',
    handler: pollsHandler.findOne
  },
  {
    method: 'POST',
    path: '/api/v1/polls',
    handler: pollsHandler.add,
    config: {
      pre: [
        { method: validateToken, assign: "auth" }
      ]
    }
  },
  {
    method: 'PATCH',
    path: '/api/v1/polls/{id}',
    handler: pollsHandler.update,
    config: {
      pre: [
        { method: validateToken, assign: "auth" }
      ]
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/polls/{id}',
    handler: pollsHandler.remove,
    config: {
      pre: [
        { method: validateToken, assign: "auth" }
      ]
    }
  },

  // USERS Routes
  {
    method: 'POST',
    path: '/users/signup',
    handler: usersHandler.signup
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: usersHandler.login
  },
  {
    method: 'POST',
    path: '/users/logout',
    handler: usersHandler.logout
  }
]
