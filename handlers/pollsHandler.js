'use strict'
const Polls = require('../models/polls.js')
const newPollObject = require('../helpers/newPollObject.js')
const updatePollObject = require('../helpers/updatePollObject.js')
const mongoose = require('mongoose')

exports.find = function (req, reply) {

  Polls
    .find()
    .exec()
    .then((results) => {
      reply(results)
    })
    .catch((err) => {
      throw err
    })
}

exports.findOne = function (req, reply) {

  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Polls
      .findById(req.params.id)
      .exec()
      .then((result) => {
          reply(result)
      })
      .catch((err) => {
          throw err
      })
  } else {
    reply ({error: "ObjectId provided is invalid. Please supply a valid MongoDB ObjectId to find individual records."})
  }
}

exports.add = function (req, reply) {

  if (req.payload && req.pre.auth._id) {
    let poll = newPollObject(req.payload, req.pre.auth._id)
    poll.save()
      .then((result) => {
        reply(result)
      })
      .catch((err) => {
        throw err
      })
  } else {
    reply(req.pre.auth)
  }
}

exports.update = function (req, reply) {

  if (mongoose.Types.ObjectId.isValid(req.params.id) && req.payload.option_id) {
    Polls.
      findOneAndUpdate( { '_id': req.params.id, "poll_options._id": req.payload.option_id },
                        { '$inc': {'poll_options.$.count': 1 } },
                        { new: true })
      .exec()
      .then((result) => {
        reply(result)
      })
      .catch((err) => {
        throw err
      })
  } else if (mongoose.Types.ObjectId.isValid(req.params.id) && req.pre.auth._id) {
    Polls.
      findOneAndUpdate( { '_id': req.params.id, 'created_by': req.pre.auth._id },
                        { $set: updatePollObject(req.payload) },
                        { new: true })
      .exec()
      .then((result) => {
        reply(result)
      })
      .catch((err) => {
        throw err
      })
  } else {
    reply({error: "Object or authorization error."})
  }
}

exports.remove = function (req, reply) {

  if (mongoose.Types.ObjectId.isValid(req.params.id) && req.pre.auth._id) {
    Polls.
      findOneAndRemove({ '_id': req.params.id, 'created_by': req.pre.auth._id })
      .exec()
      .then((result) => {
        reply(result)
      })
      .catch((err) => {
        throw err
      })
  } else {
    reply ({error: "Object or authorization error."})
  }
}
