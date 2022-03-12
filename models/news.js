import mongoose from 'mongoose'
import paranoidMongoose from '@abslibs/mongoose-plugin'
const Schema = mongoose.Schema

const newsSchema = new Schema({

  name: {
    type: String,
    required: [true, 'El nombre de la novedad es obligatorio'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'El contenido de la novedad es obligatorio'],
    trim: true
  },
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
},
{
  timestamps: true
})

newsSchema.plugin(paranoidMongoose, {
  paranoid: true
})
const News = mongoose.model('News', newsSchema)

export { News }
