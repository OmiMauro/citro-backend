import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

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
mongoosePaginate.paginate.options = {
	lean: true,
	limit: 20
}

galerySchema.plugin(mongoosePaginate)

const Galery = mongoose.model('Galery', galerySchema)

export { Galery }
