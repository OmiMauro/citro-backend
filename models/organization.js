import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la organizacion es obligatorio'],
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
  welcomeText: {
    type: String,
    trim: true
  },
  aboutUs: {
    type: String,
    trim: true
  },
  tokenMP: {
    type: String
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
  }

})

const Organizations = mongoose.model('Organizations', organizationSchema)

export { Organizations }
