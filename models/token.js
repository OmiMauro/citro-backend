import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema(
	{
		_userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true
		},
		token: {
			type: String,
			required: true
		},
		expiredAt: {
			type: Date,
			default: Date.now,
			expires: '1d'
		}
	},
	{
		timestamps: true
	}
)

const Token = mongoose.model('Token', tokenSchema)
export { Token }
/* https://stackoverflow.com/questions/39092822/how-to-confirm-email-address-using-express-node */
