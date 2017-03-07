'use strict'

const Polls = require('../models/polls.js')

exports.find = function (req, reply) {

  Polls
    .find({ 'created_by': 12345 })
    .exec()
    .then((results) => {
      reply(results)
    })
    .catch((err) => {
      throw err
    })
}

exports.findOne = function (req, reply) {

  Polls
    .findOne({ '_id': '58be13e37aef7a005b619a8d' })
    .exec()
    .then((result) => {
        reply(result)
    })
    .catch((err) => {
        throw err
    })
}

exports.add = function (req, reply) {

  let newPollObject = {};

	newPollObject['created_by'] = 12345
	newPollObject['created_timestamp'] = Date.now()
	newPollObject['active'] = true
	newPollObject['poll_stimulus'] = "Poll question here"
	newPollObject['poll_options'] = [{option: "option one", count: 0}, {option: "option two", count: 0}]
	let poll = new Polls(newPollObject)

  poll.save()
    .then((result) => {
      reply(result)
    })
    .catch((err) => {
      throw err
    })
}

exports.update = function (req, reply) {

  Polls.
    findOneAndUpdate( { '_id': '58be13e37aef7a005b619a8d' },
                      {$set: {'poll_stimulus': "Another new question here"}},
                      {new: true})
    .exec()
    .then((result) => {
      reply(result)
    })
    .catch((err) => {
      throw err
    })
}

exports.remove = function (req, reply) {

  Polls.
    findOneAndRemove({ '_id': '58be13e37aef7a005b619a8d' })
    .exec()
    .then((result) => {
      reply(result)
    })
    .catch((err) => {
      throw err
    })
}
