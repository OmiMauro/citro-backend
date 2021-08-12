import mercadopago from 'mercadopago'
import Inscription from '../models/inscription.js'
import OrderMP from '../models/ordersMercadoPago.js'
import axios from 'axios'
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
      unit_price
    })
    const orderSaved = await createOrder.save()
    findInscription.orders.push(orderSaved._id)
    await findInscription.save()
    const preference = await mercadopago.preferences.create({
      external_reference: orderSaved._id.toString(),
      statement_descriptor: 'CitroRodando',
      notification_url: `${process.env.NAME_APPLICATION}/api/mercadopago/ipn`,
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
        description: 'Inscripción para el evento a realizarse en Jardín América, Misiones, los días 20 y 21 de noviembre.'
      }],
      installments: 12
    })
    res.status(200).json({ init_point: preference.body.init_point })
  } catch (err) {
    res.status(500).json({ error: true, msg: err.message })
  }
}
const ipn = async (req, res) => {
  try {
    if (req.params.topic === 'payment') {
      const findPay = await axios({
        method: 'GET',
        URL: `https://api.mercadopago.com/v1/payments/${req.params.id}?${process.env.ACCESS_TOKEN_MP}`
      })
      if (findPay) {
        const { id, date_created, date_updated, status, status_detail, external_reference } = findPay
        const { net_received_amount } = findPay.transaction_details
        const findOrderAndUpdate = await OrderMP.findByIdAndUpdate({ _id: external_reference },
          {
            id_Operacion: id,
            date_created,
            date_updated,
            status,
            status_detail,
            net_received_amount
          }, {
            new: true
          })
      }
    }

    return res.status(200)
  } catch (e) {
    console.log(e.message)
  }
}
export { createPreference, ipn }

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

/*
    https://citrorodando.herokuapp.com/success?
    collection_id=1239676416&
    collection_status=approved&
    payment_id=1239676416&
    status=approved&
    external_reference=null&
    payment_type=credit_card&
    merchant_order_id=3087622728&
    preference_id=419703172-0034208c-b760-4358-9e9e-625018219688&
    site_id=MLA&
    processing_mode=aggregator&
    merchant_account_id=null

    /api/mercadopago/ipn?id=16341640060&topic=payment

    /api/mercadopago/ipn?id=3090319927&topic=merchant_order

    */
