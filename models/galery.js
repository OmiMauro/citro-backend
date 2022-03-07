import mongoose from 'mongoose'
const Schema = mongoose.Schema

const galerySchema = new Schema({
  image: { type: String },
  filename: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId }
})

const Galery = mongoose.model('Galery', galerySchema)

export { Galery }
