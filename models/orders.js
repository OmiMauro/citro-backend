import mongoose, { Schema } from 'mongoose'

const Orders = mongoose.model(
  'Orders',
  new Schema(
    {},
    {
      timestamps: true,
    }
  )
)
export default Orders
