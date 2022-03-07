import mongoose from 'mongoose'
const Schema = mongoose.Schema

const inscriptionsSchema = new Schema({
  provinceOrigin: {
    type: String,
    trim: true,
    required: [true, 'La provincia de origen es obligatorio. '],
    uppercase: true
  },
  locationOrigin: {
    type: String,
    default: 'Otro',
    trim: true,
    required: [true, 'La localidad de origen es obligatorio'],
    uppercase: true
  },
  travelPeople: {
    type: Number,
    default: 1
  }
},
{
  timestamps: true
})

const Inscription = mongoose.model('Inscriptions', inscriptionsSchema)

export { Inscription }
