import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'El nombre del usuario es requerido'],
    maxlength: 32
  },
  lastname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'El email del usuario es requerido'],
    unique: true
  },
  hashedPassword: {
    type: String,
    require: true
  },
  image: {
    type: String
  },
  roleId: {
    type: Number
  }

}, {
  timestamps: true
})
const Users = mongoose.model('Users', usersSchema)

export { Users }
