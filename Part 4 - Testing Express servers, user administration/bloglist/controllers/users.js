const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const minPasswordLength = 3
  if (!password) {
    return response.status(400).json({ error: 'password is required' })
  } else if (password.length < minPasswordLength) {
    return response
      .status(400)
      .json({
        error: `password is shorter than the minimum length length of ${minPasswordLength}`,
      })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
