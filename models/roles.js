import mongoose from 'mongoose'
const Schema = mongoose.Schema

const rolesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre del rol es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true })

const Roles = mongoose.model('Roles', rolesSchema)

export { Roles }
