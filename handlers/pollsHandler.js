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

  if (req.payload) {
    let poll = newPollObject(req.payload)
    poll.save()
      .then((result) => {
        reply(result)
      })
      .catch((err) => {
        throw err
      })
  }
}

exports.update = function (req, reply) {

  if (mongoose.Types.ObjectId.isValid(req.params.id)) {

    if (req.payload.optionId) {
      Polls.
        findOneAndUpdate( { '_id': req.params.id, "poll_options._id": req.payload.optionId },
                          { '$inc': {'poll_options.$.count': 1 } },
                          { new: true })
        .exec()
        .then((result) => {
          reply(result)
        })
        .catch((err) => {
          throw err
        })
    } else {
      Polls.
        findOneAndUpdate( { '_id': req.params.id },
                          { $set: updatePollObject(req.payload) },
                          { new: true })
        .exec()
        .then((result) => {
          reply(result)
        })
        .catch((err) => {
          throw err
        })
    }
  } else {
    reply ({error: "ObjectId provided is invalid. Please supply a valid MongoDB ObjectId to find individual records."})
  }
}

exports.remove = function (req, reply) {

  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Polls.
      findOneAndRemove({ '_id': req.params.id })
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
