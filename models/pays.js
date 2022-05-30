import mongoose from 'mongoose'
const paysSchema = new mongoose.Schema(
	{
		_inscriptionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Inscriptions'
		},
		modifiedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		},
		isPay: {
			type: Boolean,
			default: false
		},
		amount: {
			type: Number
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
)
const Pays = mongoose.model('Pays', paysSchema)
export default Pays
