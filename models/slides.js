import mongoose from 'mongoose'
const Schema = mongoose.Schema

const slidesSchema = new Schema({
  image: {
    type: String,
    required: [true, 'La imagen del slide es obligatorio'],
    trim: true
  },
  text: {
    type: String,
    trim: true
  },
  order: {
    type: Number
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId
  }
}, { timestamps: true })

const Slides = mongoose.model('Slides', slidesSchema)

export { Slides }
