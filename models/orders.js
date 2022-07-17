import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema(
  {
    status: { type: String },
    status_detail: { type: String },
    init_point: { type: String },
    sandbox_init_point: { type: String },
    statement_descriptor: { type: String },
    description: { type: String },
    client_id: { type: Number },
    id_operacion: { type: String },

    date_created: { type: Date },
    date_approved: { type: Date },
    date_last_updated: { type: Date },
    last_updated: { type: Date },
    date_of_expiration: { type: Date },
    collector_id: { type: Number },
    transaction_amount: { type: Number },
    transaction_amount_refunded: { type: Number },
    transaction_details: {
      net_received_amount: { type: Number },
      total_paid_amount: { type: Number },
      overpaid_amount: { type: Number },
      installment_amount: { type: Number },
    },
    currency_id: { type: String },
    external_reference: { type: String },
    payment_method_id: { type: String },
    payment_type_id: { type: String },
    statement_descriptor: { type: String },
    payment_method_id: { type: String },
    payment_type_id: { type: String },
    notification_url: { type: String },
    operation_type: { type: String },
    money_release_date: { type: Date },
  },
  {
    timestamps: true,
  }
)
const Orders = mongoose.model('Orders', orderSchema)
export default Orders
