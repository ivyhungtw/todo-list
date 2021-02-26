// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Todo model
const Todo = require('../../models/todo')

// Set up routes of home page
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// Export
module.exports = router
