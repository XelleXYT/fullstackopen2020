const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const config = require('../utils/config')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  autor: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  url: {
      type: String,
      required: true,
      unique: true,
      minlength: 10
  },
  likes: {
      type: Number,
      default: 0
  }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)