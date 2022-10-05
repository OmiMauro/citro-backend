import ordersRepository from '../repositories/orders.js'
import inscriptionsRepository from '../repositories/inscriptions.js'
import mercadoPago from '../modules/mercadopago.js'

const create = async (user, inscriptionId) => {
  let inscription = await inscriptionsRepository.getById(inscriptionId)
  if (!inscription) {
    const error = new Error('No se encontró una inscripcion con el ID')
    error.status = 404
    throw error
  }
  let order = await ordersRepository.create()
  let preference = {
    external_reference: order._id.toString(),
    statement_descriptor: `Inscripción DNI: ${user.DNI}`,
    items: [
      {
        title: `DNI: ${user.DNI}`,
        unit_price: inscription.unitPrice,
        quantity: 1,
        currency_id: 'ARS',
        description: `Inscripción DNI: ${user.DNI}`,
      },
    ],

    expires: true,
  }
  const orderMercadoPago = await mercadoPago.createPreference(preference)
  if (!orderMercadoPago) {
    const error = new Error('No se pudo crear la preferencia de pago de MP')
    error.status = 400
    throw error
  }
  order = await ordersRepository.update(order._id, orderMercadoPago.body)
  if (!order) {
    const error = new Error('No se pudo actualizar la orden.')
    error.status = 400
    throw error
  }
  return order
}

const update = async (id) => {
  const payment = await mercadoPago.getPayment(id)
  if (payment.status !== 200) {
    //I have launch error to sentry
    const error = new Error('No se encontro la orden con el ID')
    error.status = 404
    throw error
  }
  const _orderId = payment.response.external_reference
  const order = await ordersRepository.update(orderId, payment.response)
  if (!order) {
    const error = new Error('No se pudo actualizar la orden')
    error.status = 500
    throw error
  }
  return true
}

const getById = async (id) => {
  const order = await ordersRepository.getById(id)
  if (!order) {
    const error = new Error('No se encontro la orden con el ID')
    error.status = 404
    throw error
  }
  return order
}
export default { create, update, getById }
