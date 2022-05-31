import paranoidMongoose from '@abslibs/mongoose-plugin'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const inscriptionsSchema = new Schema(
	{
		provinceOrigin: {
			type: String,
			trim: true,
			uppercase: true
		},
		locationOrigin: {
			type: String,
			trim: true,
			uppercase: true
		},
		travelPeople: {
			type: Number,
			default: 1
		},
		_userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		},
		_eventId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Events'
		},
		_payId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Pays'
		},
		unit_price: {
			type: Number
		},
		amount_to_pay: {
			type: Number
		}
	},
	{
		timestamps: true
	}
)
inscriptionsSchema.plugin(paranoidMongoose, {
	paranoid: true
})
const Inscriptions = mongoose.model('Inscriptions', inscriptionsSchema)

export default Inscriptions
