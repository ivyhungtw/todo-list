// Require related packages
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

// Export
module.exports = mongoose.model('Todo', todoSchema)
