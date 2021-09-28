import mongoose from 'mongoose'
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const orderSchema = new Schema(
  {
    inscription: {
      type: ObjectId,
      ref: 'Inscription'
    },
    title: {
      type: String,
      trim: true,
      uppercasse: true
    },
    unit_price: {
      type: Number
    },
    status: {
      type: String,
      default: 'pending'
    },
    status_detail: {
      type: String,
      default: 'not-accredited'
    },
    id_Operacion: {
      type: String
    },
    date_created: {
      type: Date,
      default: Date.now()
    },
    date_last_updated: {
      type: Date,
      default: Date.now()
    },
    date_approved: {
      type: Date,
      default: Date.now()
    },
    net_received_amount: {
      type: Number,
      default: 0
    },
    total_paid_amount: {
      type: Number,
      default: 0
    },
    payment_type_id: {
      type: String
    },
    transaction_amount_refunded: {
      type: Number,
      default: 0
    },
    init_point: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
