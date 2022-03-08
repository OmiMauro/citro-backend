import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la organización es obligatorio'],
    trim: true
  },
  image: {
    type: String
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
    type: String
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
