import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  description: {
    type: String,
    defaul: 'CitroRodando'
  },
  url: { type: String },
  filename: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId }
})

const Image = mongoose.model('Image', imageSchema)

export { Image }
