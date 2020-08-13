const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
require('express-async-errors')

logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, 
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {logger.info('connected to MongoDB')})
    .catch(error => {logger.error('error connecting to MongoDB:',error.message)})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app