const Mongoose = require('mongoose')
const { Schema } = Mongoose

// Contact Schema
const ContactSchema = new Schema({
  name: { type: String, trim: true },
  email: { type: String },
  message: { type: String, trim: true },
  created: { type: Date, default: Date.now },
  updated: Date
})

module.exports = Mongoose.model('Contact', ContactSchema)
