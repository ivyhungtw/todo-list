// Require related packages
const mongoose = require('mongoose')
const Todo = require('../todo')

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

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('done')
})
