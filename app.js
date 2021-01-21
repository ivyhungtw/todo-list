// Require related packages
const express = require('express')

const app = express()
const port = 3000

// Set up routes
app.get('/', (req, res) => {
  res.send('Hi')
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on the server http://localhost:${port}`)
})
