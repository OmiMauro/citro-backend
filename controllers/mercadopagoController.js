import mercadopago from 'mercadopago'
import Inscription from '../models/inscription.js'
import OrderMP from '../models/orders.js'
import axios from 'axios'
import mongoose from 'mongoose'
const unit_price = parseInt(process.env.price)
const statement_descriptor = process.env.STATEMENT_DESCRIPTOR
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
      title: `DNI: ${DNI}`,
      unit_price,
      inscription: findInscription._id
    })
    const orderSaved = await createOrder.save()
    findInscription.orders.push(orderSaved._id)
    await findInscription.save()
    const preference = await mercadopago.preferences.create({
      external_reference: orderSaved._id.toString(),
      statement_descriptor,
      notification_url: `${process.env.NAME_APPLICATION}/api/mercadopago/webhook?source_news=webhooks`,
      back_urls: {
        success: `${process.env.NAME_APPLICATION}/success`,
        failure: `${process.env.NAME_APPLICATION}/pending`,
        pending: `${process.env.NAME_APPLICATION}/rejected`
      },
      items: [{
        title: `DNI: ${DNI}`,
        unit_price,
        quantity: 1,
        currency_id: 'ARS',
        description: `Inscripción para el encuentro de autos cuyo DNI: ${DNI}`
      }],
      payer: {
        name: name,
        surname: lastname,
        email: email,
        identification: {
          type: 'DNI',
          number: DNI
        }
      }
    })
    res.status(200).json({ init_point: preference.body.init_point })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const webhook = async (req, res) => {
  try {
    if (req.query.type === 'payment') {
      const id = req.query['data.id']
      const findPay = await findPayMP(id)
      if (findPay.statusText === 'OK') {
        await updateOrderDB(findPay)
      }
    }
    return res.status(200)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const findPayMP = async (id) => {
  const response = await axios({
    method: 'GET',
    url: `https://api.mercadopago.com/v1/payments/${id}?access_token=${process.env.ACCESS_TOKEN_MP}`
  })
  return response
}

const updateOrderDB = async (findPay) => {
  const { id, date_created, date_last_updated, date_approved, status, status_detail, external_reference, operation_type, payment_type_id } = findPay.data
  const { net_received_amount, total_paid_amount } = findPay.data.transaction_details
  const objectId = mongoose.Types.ObjectId(external_reference)
  const findOrderAndUpdate = await OrderMP.findByIdAndUpdate({ _id: objectId },
    {
      id_Operacion: id,
      date_created,
      date_last_updated,
      date_approved,
      status,
      status_detail,
      net_received_amount,
      total_paid_amount,
      operation_type,
      payment_type_id
    })
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
