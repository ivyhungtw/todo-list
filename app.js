// Require related packages
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

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

// Set up routes
app.get('/', (req, res) => {
  res.send('Hi')
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on the server http://localhost:${port}`)
})
