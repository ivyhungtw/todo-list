// Require related packages
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

// Export and initialize package
module.exports = app => {
  // Initialize passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // Set up local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne({ email })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: 'The email has not been registered!',
              })
            }

            return bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
                return done(null, false, {
                  message: 'Incorrect password!',
                })
              }
              return done(null, user)
            })
          })
          .catch(err => done(err, false))
      }
    )
  )

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
