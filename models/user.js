import mongoose from 'mongoose'
import crypto from 'crypto'
import { v1 } from 'uuid'
import { log } from 'console'

const uuidv1 = v1
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
    type: Number
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
    console.log(plainText)
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
const User = mongoose.model('User', userSchema)

export default User
