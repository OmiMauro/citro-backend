import eventsRespository from '../repositories/events.js'
import inscriptionsRepository from '../repositories/inscriptions.js'
import paysRepository from '../repositories/pays.js'
import ordersRepository from '../repositories/orders.js'
import mercadopago from '../modules/mercadopago.js'
import ordersServices from './orders.js'

const getById = async (id) => {
  const inscription = await inscriptionsRepository.getById(id)
  if (!inscription) {
    const error = new Error('No se encontró la inscripción')
    error.status = 404
    throw error
  }
  return inscription
}

const update = async (id, body) => {
  const inscription = await inscriptionsRepository.getById(id)
  if (!inscription) {
    const error = new Error('No se encontró la inscripcion')
    error.status = 404
    throw error
  }
  const updatedInscription = await inscriptionsRepository.update(id, body)
  if (!inscription) {
    const error = new Error('No se pudo actualizar la inscripcion')
    error.status = 400
    throw error
  }
  return updatedInscription
}

const create = async (user, _eventId, body) => {
  const event = await eventsRespository.getById(_eventId)
  if (!event) {
    const error = new Error('No se encontró el evento')
    error.status = 404
    throw error
  }
  let inscription = await inscriptionsRepository.existsInscription(
    event._id,
    user._id
  )
  if (inscription.length) {
    const error = new Error('Ya se encuentra inscripto al evento')
    error.status = 400
    throw error
  }
  body = { ...body, _userId: user._id, _eventId, unitPrice: event.price }
  inscription = await inscriptionsRepository.create(body)
  if (!inscription) {
    const error = new Error('Ocurrió un error al inscribirse')
    error.status = 400
    throw error
  }
  /*  const order = await ordersServices.create(user, newInscription._id) 
  inscription = await inscriptionsRepository.update(inscription._id, {
    _orderId: order._id,
  })
  */
  return inscription
}

const getAll = async (authUser, query) => {
  const inscriptions = await inscriptionsRepository.getAll({
    _userId: authUser._id,
  })

  if (!inscriptions) {
    const error = new Error('No se encontraron inscripciones')
    error.status = 400
    throw error
  }
  return inscriptions
}

export default { getById, update, create, getAll }
