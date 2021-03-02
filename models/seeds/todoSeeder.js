// Require related packages
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Todo = require('../todo')
const User = require('../user')

// Variables
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '123456',
}

// Success
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then(user => {
      const userId = user._id
      for (let i = 0; i < 10; i++) {
        Todo.create({ name: `name-${i + 1}`, userId })
      }
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})
