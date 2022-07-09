import paranoidMongoose from '@abslibs/mongoose-plugin'
import mongoosePaginate from 'mongoose-paginate'
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

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 10,
}
inscriptionsSchema.plugin(mongoosePaginate)
const Inscriptions = mongoose.model('Inscriptions', inscriptionsSchema)

export default Inscriptions
