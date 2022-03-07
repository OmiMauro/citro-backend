import mongoose from 'mongoose'
const Schema = mongoose.Schema

const organizationSchema = new Schema({

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

const Organization = mongoose.model('Organization', organizationSchema)

export { Organization }
