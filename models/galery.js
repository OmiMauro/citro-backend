import mongoose from 'mongoose'
const Schema = mongoose.Schema

const galerySchema = new Schema({
  image: { type: String },
  filename: { type: String }
})

const Galery = mongoose.model('Galery', galerySchema)

export { Galery }
