import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  asset_id:
   { type: String },
  public_id:
   { type: String },
  version_id:
   { type: String },
  signature:
   { type: String },
  url:
   { type: String },
  secure_url:
   { type: String },
  original_filename:
   { type: String },
  api_key:
   { type: String }
})

const Image = mongoose.model('Image', imageSchema)

export { Image }
