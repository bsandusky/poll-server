'use strict'

const formatOptions = require('./formatOptions.js')

module.exports = (payload) => {

  if (payload.poll_options) {
    payload.poll_options = formatOptions(payload.poll_options)
  }

  payload.last_updated = Date.now()
  return payload
}
