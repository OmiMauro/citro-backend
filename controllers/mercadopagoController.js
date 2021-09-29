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
      dateToProvince,
      paymentWithMP
    } = req.body
    const findInscriptionNew = await await Inscription.findOne({ DNI })
    // si encuentra una inscripcion con el DNI ingresado
    if (findInscriptionNew) {
      return res.status(200).json({
        inscription: true,
        message: '¡El DNI ingresado ya se inscribió. Te esperamos!'
      })
    } else {
      // cuando el usuario no se inscribió
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
      // Si el usuario va a pagar en efectivo el día del evento
      if (!paymentWithMP) {
        const createOrder = await OrderMP.create({
          title: `DNI: ${DNI}`,
          unit_price,
          inscription: savedIncription._id,
          status: 'pending',
          status_detail: 'efectivo'
        })
        const orderSaved = await createOrder.save()
        savedIncription.orders = orderSaved._id
        await savedIncription.save()
        return res.status(201).json({
          message: 'La inscripción se registró con éxito. ¡Te esperamos!'
        })
      } else {
        // Método de pago con MercadoPago
        const createOrder = await OrderMP.create({
          title: `DNI: ${DNI}`,
          unit_price,
          inscription: savedIncription._id
        })
        const orderSaved = await createOrder.save()

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
        savedIncription.orders = orderSaved._id
        await savedIncription.save()
        orderSaved.init_point = preference.body.init_point
        await orderSaved.save()
        res.status(200).json({ init_point: preference.body.init_point })
      }
    }
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
