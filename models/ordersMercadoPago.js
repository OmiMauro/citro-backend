import mongoose from 'mongoose'
import Inscription from './inscription.js'
const Schema = mongoose.Schema

const orderSchema = new Schema({
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
  date_last_updated: {
    type: Date
  },
  date_approved: {
    type: Date
  },
  net_received_amount: {
    type: Number
  },
  total_paid_amount: {
    type: Number
  }
}, {
  timestamps: true
}
)

const modelOrder = mongoose.model('Order', orderSchema)
export default modelOrder

/*
{
  "id": 806459734,
  "nickname": "TESTOZJVBH5J",
  "password": "qatest7143",
  "site_status": "active",
  "email": "test_user_8045216@testuser.com"
}

2
{
  "id": 806468787,
  "nickname": "TESTOX8FWS7L",
  "password": "qatest5658",
  "site_status": "active",
  "email": "test_user_18834777@testuser.com"
} */
