'use strict'

const pollsHandler = require('../handlers/pollsHandler')

module.exports = [
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
    method: 'PUT',
    path: '/api/v1/polls/{id}',
    handler: pollsHandler.update
    //auth
  },
  {
    method: 'DELETE',
    path: '/api/v1/polls/{id}',
    handler: pollsHandler.remove
    //auth
  }
]
