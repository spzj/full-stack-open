const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: 3,
      unique: true,
      required: true,
    },
    name: { type: String, trim: true, required: true },
    passwordHash: { type: String, trim: true, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
      },
    },
    toObject: { virtuals: true },
  }
)

// Virtual blogs instead of schema blogs to adhere to the principal of least cardinality
userSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
})

module.exports = mongoose.model('User', userSchema)
