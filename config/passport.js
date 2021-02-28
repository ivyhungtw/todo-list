// Require related packages
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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

  // Set up facebook strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      (accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json
        User.findOne({ email }).then(user => {
          // If user already exists in User model, return user
          if (user) return done(null, user)

          // If user doesn't exist, create a user and save to User model
          // because password field is required in the model,
          // we have to generate a random password for it
          const randomPassword = Math.random().toString(36).slice(-8)
          // hash the randomPassword
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash =>
              User.create({
                name,
                email,
                password: hash,
              })
            )
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
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
