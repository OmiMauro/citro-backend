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
  if (!order) {
    const error = new Error('No se pudo agregar la orden.')
    error.status = 400
    throw error
  }
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
    /* payer: {
      name: user.name,
      surname: user.lastname,
      email: user.email,
      identification: {
        type: 'DNI',
        number: user.DNI,
      },
    }, */
    expires: true,
  }
  const orderMercadoPago = await mercadoPago.createPreference(preference)
  if (!orderMercadoPago) {
    const error = new Error('No se pudo crear la orden de pago de MP')
    error.status = 400
    throw error
  }
  order = await ordersRepository.update(order._id, orderMercadoPago.body)
  if (!order) {
    const error = new Error('No se pudo actualizar la orden.')
    error.status = 400
    throw error
  }
  inscription = await inscriptionsRepository.update(inscription._id, {
    _orderId: order._id,
  })
  return order
}

const update = async (id) => {
  const payment = await mercadopago.getPayment(id)
  if (payment.statusText !== 'OK') {
    const error = new Error('No se encontro la orden con el ID')
    error.status = 404
    throw error
  }
  const orderId = payment.data.external_reference

  let order = await ordersRepository.getById(orderId)
  /*  if (!order) {
    const error = new Error('No se encontro la orden con el ID')
    error.status = 404
    throw error
  }
 */
  order = await ordersRepository.update(orderId, payment.data)
  if (!order) {
    const error = new Error('No se pudo actualizar la orden')
    error.status = 400
    throw error
  }
  return order
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
