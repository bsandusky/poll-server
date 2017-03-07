'use strict'

const Hapi = require('hapi')
const server = new Hapi.Server()
const mongoose = require('mongoose')
server.connection({ port: process.env.PORT || 8000 })

mongoose.connect(process.env.MONGO_URI)
mongoose.Promise = global.Promise

server.route(require('./routes/index'))

server.start(() => {
  console.log("Server running at " + server.info.uri)
})
