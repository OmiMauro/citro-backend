import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const inscriptionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    uppercasse: true
  },
  lastname: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    uppercasse: true
  },
  DNI: {
    type: Number,
    required: [true, 'El DNI es obligatorio'],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
    /* match: [/\S+@\S+\.\S+/] */
  },
  numberCell: {
    type: String,
    trim: true
  },
  provinceOrigin: {
    type: String,
    trim: true,
    required: [true, 'La provincia de origen es obligatorio. ']

  },
  locationOrigin: {
    type: String,
    default: 'Otro',
    trim: true,
    required: [true, 'La localidad de origen es obligatorio']
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  }]
}, {
  timestamps: true
})

inscriptionSchema.plugin(uniqueValidator)
const Inscription = mongoose.model('Inscriptions', inscriptionSchema)
export default Inscription
