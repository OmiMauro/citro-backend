import eventsRespository from '../repositories/events.js'
import inscriptionsRepository from '../repositories/inscriptions.js'
import paysRepository from '../repositories/pays.js'

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
const create = async (_userId, _eventId, body) => {
  const event = await eventsRespository.getById(_eventId)
  if (!event) {
    const error = new Error('No se encontró el evento')
    error.status = 404
    throw error
  }
  const inscription = await inscriptionsRepository.existsInscription(
    event._id,
    _userId
  )
  if (inscription) {
    const error = new Error('Ya se encuentra inscripto al evento')
    error.status = 400
    throw error
  }
  const pay = await paysRepository.create()
  body = { ...body, _userId, _eventId, unitPrice: event.price, _payId: pay._id }
  const newInscription = await inscriptionsRepository.create(body)
  if (!inscription) {
    const error = new Error('Ocurrió un error al inscribirse')
    error.status = 400
    throw error
  }
  return newInscription
}
const getAll = async (_eventId) => {
  const event = await eventsRespository.getById(_eventId)
  if (!event) {
    const error = new Error('No se encontró el evento')
    error.status = 404
    throw error
  }
  const inscriptions = await inscriptionsRepository.getAll(event._id)
  if (!inscriptions) {
    const error = new Error('No se encontraron inscripciones para el evento')
    error.status = 400
    throw error
  }
  return inscriptions
}

export default { getById, update, create, getAll }
