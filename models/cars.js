import mongoose from 'mongoose'
const Schema = mongoose.Schema
const carsSchema = new Schema(
	{
		_userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		},
		name: {
			type: String,
			trim: true,
			uppercase: true
		},
		registration: {
			type: String,
			required: [true, 'Ingrese la patente del auto']
		},
		year: {
			type: Number,
			required: [true, 'Ingrese el año de fabricación del auto']
		},
		VTV: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
)

const Cars = mongoose.model('Cars', carsSchema)
export default Cars
