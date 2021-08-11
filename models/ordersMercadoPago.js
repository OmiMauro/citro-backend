import mongoose from 'mongoose'
import Inscription from './inscription.js'
const Schema = mongoose.Schema

const orderSchema = new Schema({
  inscription: {
    type: Schema.Types.ObjectId,
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
    type: String
  },
  status_detail: {
    type: String
  },
  id_Operacion: {
    type: String
  },
  date_created: {
    type: Date
  },
  date_updated: {
    type: Date
  },
  date_approved: {
    type: Date
  },
  net_received_amount: {
    type: Number
  }
})

const modelOrder = mongoose.model('Order', orderSchema)
export default modelOrder
