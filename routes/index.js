// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require home module
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')

// Direct request to modules
router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

// Export
module.exports = router
