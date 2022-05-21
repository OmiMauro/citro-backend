import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const usersSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'El nombre del usuario es requerido'],
			maxlength: 32
		},
		lastname: {
			type: String,
			required: [true, 'El apellido del usuario es requerido'],
			trim: true
		},
		email: {
			type: String,
			trim: true,
			required: [true, 'El email del usuario es requerido'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'La contraseña del usuario se requiere']
		},
		image_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Image'
		},
		DNI: {
			type: Number
		},
		phone: {
			type: String,
			required: [true, 'El numero de celular es requerido']
		},
		dateBirth: {
			type: Date
		},
		roleId: {
			type: Number,
			ref: 'Roles'
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		token: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Token'
		}
	},
	{
		timestamps: true
	}
)

usersSchema.plugin(uniqueValidator)
const Users = mongoose.model('Users', usersSchema)

export { Users }
