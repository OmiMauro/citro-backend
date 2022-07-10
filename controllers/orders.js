import ordersServices from '../services/orders.js'

const createPreference = async (req, res, next) => {
  try {
    const preference = await ordersServices.createPreference(req)
    return res
      .status(201)
      .json({ msg: 'Se creó la preferencia con éxito', data: preference })
  } catch (error) {
    res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}
const webhook = async (req, res) => {
  try {
    res.status(200).end()
    if (req.query.type === 'payment') {
      const id = req.query['data.id']
      const findPay = await findPayMP(id)
      if (findPay.statusText === 'OK') {
        await updateOrderDB(findPay)
      }
    }
  } catch (error) {
    return res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}
export default { createPreference, webhook }

const updateOrderDB = async (findPay) => {
  const {
    id,
    date_created,
    date_last_updated,
    date_approved,
    status,
    status_detail,
    external_reference,
    transaction_amount_refunded,
    operation_type,
    payment_type_id,
  } = findPay.data
  const { net_received_amount, total_paid_amount } =
    findPay.data.transaction_details
  const objectId = mongoose.Types.ObjectId(external_reference)
  const netoRecivido = net_received_amount - transaction_amount_refunded
  const findOrderAndUpdate = await OrderMP.findByIdAndUpdate(
    { _id: objectId },
    {
      id_Operacion: id,
      date_created,
      date_last_updated,
      date_approved,
      status,
      status_detail,
      net_received_amount: netoRecivido,
      total_paid_amount,
      operation_type,
      payment_type_id,
      transaction_amount_refunded,
    }
  )
}
