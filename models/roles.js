import mongoose from 'mongoose'
const Schema = mongoose.Schema

const rolesSchema = new Schema({
  _id: {
    type: Number
  },
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

/* const resp = async () => {
  const rol = [{ _id: 1, name: 'standard', description: 'Role  of user standard' }, { _id: 2, name: 'admin', description: 'Role of Administrador' }]
  return await Roles.insertMany(rol)
}
console.log(async () => await resp()) */
export { Roles }
