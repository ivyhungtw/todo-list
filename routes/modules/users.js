// Require Express and Express router
const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// Set up routes
router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('The email has already been used!')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      User.create({
        name,
        email,
        password,
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

// Export module
module.exports = router
