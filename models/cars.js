import mongoose from 'mongoose'
const Schema = mongoose.Schema
const carsSchema = new Schema({

  name: {
    type: String,
    trim: true,
    uppercase: true
  },
  registration: {
    type: String,
    required: [true, 'La patente es requerida']
  },
  color: {
    type: String,
    required: [true, 'El color del auto es obligatorio'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'El año de fabricación del auto es obligatorio']
  },
  version: {
    type: String,
    required: [true, 'El modelo del auto es obligatorio'],
    enum: ['freeToPlay', 'earlyAccess', 'action', 'adventure', 'casual', 'indie', 'massivelyMultiplayer', 'racing', 'simulation', 'RPG', 'sports', 'statigy'],
    trim: true,
    uppercase: true
  },
  style: {
    type: String,
    required: [true, 'El estilo del auto es obligatorio'],
    enum: ['freeToPlay', 'earlyAccess', 'action', 'adventure', 'casual', 'indie', 'massivelyMultiplayer', 'racing', 'simulation', 'RPG', 'sports', 'statigy'],
    trim: true,
    uppercase: true
  },
  VTV: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true

})

const Cars = mongoose.model('Cars', carsSchema)
export { Cars }
