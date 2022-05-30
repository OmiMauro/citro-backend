import mongoose from 'mongoose'

const eventsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre del evento es requerido']
		},
		price: {
			type: Number,
			min: 0
		},
		description: {
			type: String,
			required: [true, 'Ingrese una descripcion del evento']
		},
		dates: [{ type: Date, required: [true, 'Ingrese las fechas del evento'] }],
		country: String,
		province: String,
		locality: {
			type: String,
			required: [true, 'Ingrese la ubicacion en formato texto']
		},
		valid_until: {
			type: Date
		},
		is_public: {
			type: Boolean,
			default: true
		},
		hotels: [
			{
				name: String,
				phone: String,
				url: String,
				location: String
			}
		],
		chronogram: [
			{
				day: Date,
				times: String
			}
		]
	},
	{
		timestamps: true,
		versionKey: false
	}
)

const Events = mongoose.model('Events', eventsSchema)
export default Events
