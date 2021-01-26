// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require home module
const home = require('./modules/home')
const todos = require('./modules/todos')

// Direct request to modules
router.use('/', home)
router.use('/todos', todos)

// Export
module.exports = router
