// Require mongoose
const mongoose = require('mongoose')

// Connect mongoDB
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
