import mongoose from 'mongoose'
const Schema = mongoose.Schema

const slidesSchema = new Schema(
	{
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
	},
	{ timestamps: true }
)

const Slides = mongoose.model('Slides', slidesSchema)

export { Slides }
