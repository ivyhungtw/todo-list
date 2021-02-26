// Require related packages
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  userId: {
    // Relate to User model
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
})

// Export
module.exports = mongoose.model('Todo', todoSchema)
