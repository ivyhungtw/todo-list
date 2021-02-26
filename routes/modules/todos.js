// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Todo model
const Todo = require('../../models/todo')

// Set up routes
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return Todo.create({ name, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => {
      res.render('detail', { todo })
    })
    .catch(() => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => {
      res.render('edit', { todo })
    })
    .catch(() => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => {
      res.redirect(`/todos/${_id}`)
    })
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Export
module.exports = router
