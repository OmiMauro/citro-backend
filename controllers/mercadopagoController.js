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
    const {
      name,
      lastname,
      dateBirth,
      DNI,
      numberCell,
      provinceOrigin,
      locationOrigin,
      email,
      nameCar,
      registrationCar,
      colorCar,
      styleCar,
      yearCar,
      versionCar,
      VTV,
      travelPeople,
      arrivalDate,
      dateToProvince
    } = req.body
    const findInscriptionNew = await Inscription.findOne({ DNI })
    if (findInscriptionNew) {
      const updateInscription = await Inscription.findOneAndUpdate(
        { DNI: DNI },
        {
          name,
          lastname,
          dateBirth: new Date(dateBirth),
          numberCell,
          provinceOrigin,
          locationOrigin,
          email,
          nameCar,
          registrationCar,
          colorCar,
          styleCar,
          yearCar,
          versionCar,
          VTV,
          travelPeople,
          arrivalDate: new Date(arrivalDate),
          dateToProvince: new Date(dateToProvince)
        },
        { new: true }
      )
    } else {
      const inscriptionCreate = await Inscription.create({
        name,
        lastname,
        dateBirth,
        DNI,
        numberCell,
        provinceOrigin,
        locationOrigin,
        email,
        nameCar,
        registrationCar,
        colorCar,
        styleCar,
        yearCar,
        versionCar,
        VTV,
        travelPeople,
        arrivalDate,
        dateToProvince
      })
      const savedIncription = await inscriptionCreate.save()
    }
    const findInscription = await Inscription.findOne({ DNI })
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
        pending: `${process.env.NAME_APPLICATION}/pending`,
        failure: `${process.env.NAME_APPLICATION}/rejected`
      },
      items: [
        {
          title: `DNI: ${DNI}`,
          unit_price,
          quantity: 1,
          currency_id: 'ARS',
          description: `Inscripción para el encuentro de Citroen del DNI: ${DNI}`
        }
      ],
      payer: {
        name: name,
        surname: lastname,
        email: email,
        identification: {
          type: 'DNI',
          number: DNI
        }
      },
      expires: true,
      date_of_expiration: '2021-11-20T00:00:00.000-04:00'
    })
    res.status(200).json({ init_point: preference.body.init_point })
  } catch (err) {
    res.status(500).json({ error: err.message })
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
    console.log(error)
  }
}

const findPayMP = async id => {
  const response = await axios({
    method: 'GET',
    url: `https://api.mercadopago.com/v1/payments/${id}?access_token=${process.env.ACCESS_TOKEN_MP}`
  })
  return response
}

const updateOrderDB = async findPay => {
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
    payment_type_id
  } = findPay.data
  const {
    net_received_amount,
    total_paid_amount
  } = findPay.data.transaction_details
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
      transaction_amount_refunded
    }
  )
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
