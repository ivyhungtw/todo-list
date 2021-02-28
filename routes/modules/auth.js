// Require Express and Express router
const express = require('express')
const router = express.Router()

const passport = require('passport')

// Define routes
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// Export
module.exports = router
