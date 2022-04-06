import mongoose from 'mongoose'
const Schema = mongoose.Schema

const galerySchema = new Schema(
	{
		image_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Image'
		}
	},
	{
		timestamps: true
	}
)

const Galery = mongoose.model('Galery', galerySchema)

export { Galery }
