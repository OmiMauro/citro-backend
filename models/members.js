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
  image: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  aboutUs: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio']
  },
  urlFacebook: {
    type: String
  },
  urlInstagram: {
    type: String
  },
  urlWhatsapp: {
    type: String
  }
},
{
  timestamps: true
})

const Members = mongoose.model('Members', membersSchema)

export { Members }
