// Require related packages
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const PORT = process.env.PORT || 3000
const app = express()

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
app.listen(PORT, () => {
  console.log(`Listening on the server http://localhost:${PORT}`)
})
