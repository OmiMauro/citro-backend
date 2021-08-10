import mercadopago from 'mercadopago'
import Inscription from '../models/inscription.js'
import OrderMP from '../models/ordersMercadoPago.js'
const title = 'Inscripción CitroRodando'
const unit_price = 100
mercadopago.configure({
  access_token: `${process.env.ACCESS_TOKEN_MP}`
})

const createPreference = async (req, res) => {
  console.log(req.body)
  try {
    /*  const { name, lastname, DNI, email, numberCell, provinceOrigin, locationOrigin } = req.body

    let findInscription = await Inscription.findOne({ DNI })
    if (!findInscription) {
      const inscription = await Inscription.create({ name, lastname, DNI, email, numberCell, provinceOrigin, locationOrigin })
      const savedIncription = await inscription.save()
      console.log(savedIncription)
    }
    findInscription = await Inscription.findOne({ DNI }).select({ _id: 1, DNI: 1 })

    const createOrder = await OrderMP.create({
      inscriptionId: findInscription._id, title, unit_price, DNI: findInscription.DNI
    })
    const orderSaved = await createOrder.save() */
    const preference = await mercadopago.preferences.create({
      /* external_reference: toString(orderSaved.DNI), */
      statement_descriptor: 'Encuentro de Autos CitroRodando',
      notification_url: `${process.env.NAME_APPLICATION}/api/mercadopago/webhook`,
      back_urls: {
        success: `${process.env.NAME_APPLICATION}/success`,
        failure: `${process.env.NAME_APPLICATION}/pending`,
        pending: `${process.env.NAME_APPLICATION}/rejected`
      },
      items: [{
        title,
        unit_price,
        quantity: 1
      }]
    })
    console.log(preference)
    res.status(200).json({ init_point: preference.body.init_point })
  } catch (err) {
    res.status(500).json({ error: true, msg: err })
  }
}

const feedback = (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  })
}
const webhook = async (req, res) => {
  try {
    if (req.method === 'POST') {
      let body = ''
      req.on('data', chunck => {
        body += chunck.toString()
      })
      req.on('end', () => {
        console.log('response web hook', body)
        res.end('ok')
      })
    }
    return res.status(200)
  } catch (e) {
    console.log(e)
  }
}
export { createPreference, feedback, webhook }

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
