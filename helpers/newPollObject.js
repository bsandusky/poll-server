'use strict'

const Polls = require('../models/polls.js')
const formatOptions = require('./formatOptions.js')

module.exports = (payload) => {

  let formattedOptions = formatOptions(payload.poll_options)

  let newPollObject = {};
  newPollObject['created_by'] = 0
  newPollObject['created_timestamp'] = Date.now()
  newPollObject['last_updated'] = Date.now()
  newPollObject['active'] = true
  newPollObject['poll_stimulus'] = payload.poll_stimulus
  newPollObject['poll_options'] = formattedOptions

  return new Polls(newPollObject)
}
