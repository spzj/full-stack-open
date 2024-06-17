const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const setup = require('./utils/setup')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

mongoose
  .connect(config.MONGODB_URI)
  .then(async () => {
    logger.info('connected to MongoDB')
    if (process.env.NODE_ENV !== 'test') {
      await setup.initializeDatabase()
      logger.info('initialized database with data')
    }
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
