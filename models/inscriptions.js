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
    province: {
      type: String,
      trim: true,
      uppercase: true,
    },
    locality: {
      type: String,
      trim: true,
      uppercase: true,
    },
    _orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orders',
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
