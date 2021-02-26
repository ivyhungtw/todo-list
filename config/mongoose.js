// Require mongoose
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

// Connect mongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

// Get connection status
const db = mongoose.connection

// Error
db.on('error', () => {
  console.log('mongodb error!')
})

// Success
db.once('open', () => {
  console.log('mongodb connected!')
})

// Export connection status
module.exports = db
