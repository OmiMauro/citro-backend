import mongoose from 'mongoose'
import Inscription from './inscription.js'
const Schema = mongoose.Schema

const orderSchema = new Schema({
  inscriptionId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: Inscription
  },
  DNI: {
    type: Number
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
  }
})

const modelOrder = mongoose.model('OrderMercadoPago', orderSchema)
export default modelOrder
