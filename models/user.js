const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    require: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
})

// virtual field

userSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashedPassword
  },

  encryptPassword: function (password) {
    if (!password) return ' '

    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  }
}
const userModel = mongoose.model('User', userSchema)

export default userModel
