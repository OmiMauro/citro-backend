import mongoose from 'mongoose'
const Schema = mongoose.Schema

const slidesSchema = new Schema({
  image: {
    type: String,
    required: [true, 'La url del slide es obligatorio'],
    trim: true
  },
  text: {
    type: String,
    trim: true
  },
  order: {
    type: Number
  },
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }

}, { timestamps: true })

const Slides = mongoose.model('Slides', slidesSchema)

export { Slides }
