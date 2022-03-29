import mongoose from 'mongoose'
const Schema = mongoose.Schema

const membersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la organizacion es obligatorio'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'El apellido de la organizacion es obligatorio'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  urlFacebook: {
    type: String
  },
  urlInstagram: {
    type: String
  },
  urlWhatsapp: {
    type: String
  },
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
},
{
  timestamps: true
})

const Members = mongoose.model('Members', membersSchema)

export { Members }
