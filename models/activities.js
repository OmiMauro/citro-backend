/* https://www.npmjs.com/package/@abslibs/mongoose-plugin */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const activitiesSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description es requerida']
  },
  image: {
    type: String,
    required: [true, 'El color del auto es obligatorio'],
    trim: true
  }
}, {
  timestamps: true

})

const Activities = mongoose.model('Activities', activitiesSchema)
export { Activities }
