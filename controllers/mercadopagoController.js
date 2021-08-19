import mercadopago from 'mercadopago'
import Inscription from '../models/inscription.js'
import OrderMP from '../models/orders.js'
import axios from 'axios'
import mongoose from 'mongoose'
const title = process.env.title
const unit_price = parseInt(process.env.price)
mercadopago.configure({
  access_token: `${process.env.ACCESS_TOKEN_MP}`
})

const createPreference = async (req, res) => {
  try {
    const { name, lastname, DNI, email, numberCell, provinceOrigin, locationOrigin } = req.body
    let findInscription = await Inscription.findOne({ DNI })
    if (!findInscription) {
      const inscription = await Inscription.create({ name, lastname, DNI, email, numberCell, provinceOrigin, locationOrigin })
      const savedIncription = await inscription.save()
    }
    findInscription = await Inscription.findOne({ DNI })
    const createOrder = await OrderMP.create({
      title,
      unit_price,
      inscription: findInscription._id
    })
    const orderSaved = await createOrder.save()
    findInscription.orders.push(orderSaved._id)
    await findInscription.save()
    const preference = await mercadopago.preferences.create({
      external_reference: orderSaved._id.toString(),
      statement_descriptor: `${title}`,
      notification_url: `${process.env.NAME_APPLICATION}/api/mercadopago/webhook?source_news=webhooks`,
      back_urls: {
        success: `${process.env.NAME_APPLICATION}/success`,
        failure: `${process.env.NAME_APPLICATION}/pending`,
        pending: `${process.env.NAME_APPLICATION}/rejected`
      },
      items: [{
        title,
        unit_price,
        quantity: 1,
        currency_id: 'ARS',
        description: `Inscripción para el encuentro de autos cuyo DNI: ${DNI}`
      }]
    })
    res.status(200).json({ init_point: preference.body.init_point })
  } catch (err) {
    res.status(500).json({ error: true, msg: err.message })
  }
}
const webhook = async (req, res) => {
  try {
    let findOrderAndUpdate
    if (req.query.type === 'payment') {
      const id = req.query['data.id']
      const findPay = await axios({
        method: 'GET',
        url: `https://api.mercadopago.com/v1/payments/${id}?access_token=${process.env.ACCESS_TOKEN_MP}`
      })
      if (findPay.statusText === 'OK') {
        const { id, date_created, date_last_updated, date_approved, status, status_detail, external_reference, operation_type } = findPay.data
        const { net_received_amount, total_paid_amount } = findPay.data.transaction_details
        const objectId = mongoose.Types.ObjectId(external_reference)
        findOrderAndUpdate = await OrderMP.findByIdAndUpdate({ _id: objectId },
          {
            id_Operacion: id,
            date_created,
            date_last_updated,
            date_approved,
            status,
            status_detail,
            net_received_amount,
            total_paid_amount,
            operation_type
          }, {
            new: true
          })
      }
      console.log(findOrderAndUpdate)
    }
    return res.status(200)
  } catch (e) {
    console.log(e.message)
  }
}
export { createPreference, webhook }

/*
if (req.params.type === 'payment') {
      const paymentID = req.params.data.id
      // obtener sobre el pago en MercadoPago
      const payment = await mercadopago.payments.get(paymentID)
      if (payment) {
        // obtener el reference que especificamos en la orden del pago en MP
        const orderId = await payment.external_reference
        // buscar la orden en la DB
        const findOrder = await OrderMP.find({ _id: orderId })
        if (findOrder.unit_price === payment.transaction_amount) {
          findOrder.status = payment.status
          if (findOrder.status === 'approved') {
            await OrderMP.findByIdAndUpdate(findOrder._id, findOrder)
            return res.json({ msg: 'pago realizado' })
          }
        }
      }
    } */

/* NAME_APPLICATION = http://localhost:9000
ACCESS_TOKEN_MP = TEST-2136509707106412-073019-41d3ff82e295f7b42a9aa4321c5321e1-419703172
 */
