import paranoidMongoose from '@abslibs/mongoose-plugin'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const inscriptionsSchema = new Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      unique: true,
    },
    _eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events',
      unique: true,
    },
    _payId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pays',
    },
    unitPrice: {
      type: Number,
    },
    provinceOrigin: {
      type: String,
      trim: true,
      uppercase: true,
    },
    locationOrigin: {
      type: String,
      trim: true,
      uppercase: true,
    },
    travelPeople: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

inscriptionsSchema.plugin(paranoidMongoose, {
  paranoid: true,
})
const Inscriptions = mongoose.model('Inscriptions', inscriptionsSchema)

export default Inscriptions
