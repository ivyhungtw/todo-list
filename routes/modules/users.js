// Require Express and Express router
const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// Set up routes
router.get('/login', (req, res) => {
  res.render('login', { error_msg: req.flash('error') })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  User.findOne({ email }).then(user => {
    // Check if the email already exists
    if (user) {
      errors.push({ message: 'The email has already been used!' })
    }

    // Check if password and confirmPassword are the same
    if (password !== confirmPassword) {
      errors.push({ message: 'Password and confirmPassword do not match.' })
    }

    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    }

    User.create({
      name,
      email,
      password,
    })
      .then(() => {
        req.flash('success_msg', 'Register successfully! Please login.')
        res.redirect('/users/login')
      })
      .catch(error => console.log(error))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout successfully!')
  res.redirect('/users/login')
})

// Export module
module.exports = router
