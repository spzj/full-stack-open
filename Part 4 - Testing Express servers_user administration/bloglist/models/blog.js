const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    url: { type: String, trim: true, required: true },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      },
    },
    toObject: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      },
    },
  }
)

module.exports = mongoose.model('Blog', blogSchema)
