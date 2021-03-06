import paranoidMongoose from '@abslibs/mongoose-plugin'
import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
	_id: {
		type: Number
	},
	name: {
		type: String,
		required: [true, 'El nombre de la organización es obligatorio'],
		trim: true
	},
	image_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Image'
	},
	phone: {
		type: String,
		trim: true
	},
	welcomeText: {
		type: String,
		trim: true
	},
	aboutUs: {
		type: String,
		trim: true
	},
	tokenMP: {
		type: String
	},
	email: {
		type: String
	},
	urlFacebook: {
		type: String
	},
	urlInstagram: {
		type: String
	},
	urlWhatsapp: {
		type: String
	}
})
organizationSchema.plugin(paranoidMongoose, {
	paranoid: true
})
const Organizations = mongoose.model('Organizations', organizationSchema)

export { Organizations }
