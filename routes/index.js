'use strict'

const pollsHandler = require('../handlers/pollsHandler')
const usersHandler = require('../handlers/usersHandler')

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
    handler: pollsHandler.add
    //auth
  },
  {
    method: 'PATCH',
    path: '/api/v1/polls/{id}',
    handler: pollsHandler.update
    //auth
  },
  {
    method: 'DELETE',
    path: '/api/v1/polls/{id}',
    handler: pollsHandler.remove
    //auth
  },

  // USERS Routes
  {
    method: 'POST',
    path: '/users/signup',
    handler: usersHandler.signup
  }

]
