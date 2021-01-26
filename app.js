// Require related packages
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const methodOverride = require('method-override')
const routes = require('./routes')

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

// Set up template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set up body parser
app.use(express.urlencoded({ extended: true }))

// Use method-override
app.use(methodOverride('_method'))

// Set up routes
app.use(routes)

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on the server http://localhost:${port}`)
})
