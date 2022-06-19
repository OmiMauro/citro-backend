import { body } from 'express-validator'
import cloudinary from '../modules/cloudinary.js'
import filesModule from '../modules/files.js'
import eventsRepository from '../repositories/events.js'
import imagesRepository from '../repositories/images.js'

const getById = async (id) => {
  const event = await eventsRepository.getById(id)
  if (!event) {
    const error = new Error('No se encontro el evento')
    error.status = 404
    throw error
  }
  return event
}
const update = async (id, body) => {
  const event = await eventsRepository.getById(id)
  if (!event) {
    const error = new Error('No se encontro el evento')
    error.status = 404
    throw error
  }
  const eventUpdate = await eventsRepository.update(id, body)
  if (!eventUpdate) {
    const error = new Error('No se puedo actualizar el evento')
    error.status = 400
    throw error
  }
  return eventUpdate
}
const updateImage = async (id, imageFile) => {
  const event = await eventsRepository.getById(id)
  if (!event) {
    await filesModule.deleteLocalFile(imageFile)
    const error = new Error('No se encontro un evento con el ID')
    error.status = 404
    throw error
  }

  const imageUpload = await filesModule.uploadFile(imageFile, true, 'events')
  if (!imageUpload) {
    await filesModule.deleteLocalFile(imageFile)
  }
  const image = await imagesRepository.update(event.image_id, imageUpload)
  if (!image) {
    await cloudinary.deleteFile(imageUpload.public_id)
  }
  return event
}

const create = async (body, imageFile) => {
  const imageUpload = await filesModule.uploadFile(imageFile, true, 'events')
  if (!imageUpload) {
    await filesModule.deleteLocalFile(imageFile)
  }
  const image = await imagesRepository.create(imageUpload)
  body.image_id = image._id
  const event = await eventsRepository.create(body)
  if (!event) {
    await cloudinary.deleteFile(image._id)
    const error = new Error('No se puede crear el evento')
    error.status = 400
    throw error
  }
  return event
}
const getAll = async () => {
  const events = await eventsRepository.getAll()
  if (!events) {
    const error = new Error('No se encontraron eventos')
    error.status = 404
    throw error
  }
  return events
}
const remove = async (id) => {
  const event = await eventsRepository.getById(id)
  if (!event) {
    const error = new Error('No se encontro el evento')
    error.status = 404
    throw error
  }
  const fileRemove = await cloudinary.deleteFile(event.image_id)
  if (!fileRemove) {
    const error = new Error('Ocurrio un error al eliminar la imagen.')
    error.status = 400
    throw error
  }
  const imageRemove = await imagesRepository.remove(event.image_id)
  const eventRemoved = await eventsRepository.remove(id)
  if (!eventRemoved) {
    const error = new Error('No se pudo eliminar el evento')
    error.status = 404
    throw error
  }
  return eventRemoved
}

const createChronogram = async (id, body) => {
  const event = await eventsRepository.getById(id)
  if (!event) {
    const error = new Error('No se encontro un evento con el ID')
    error.status = 404
    throw error
  }
  const chronogram = await eventsRepository.createChronogram(id, body)
  if (!chronogram) {
    const error = new Error('No se pudo agregar el cronograma')
    error.status = 404
    throw error
  }
  return chronogram
}
const updateChronogram = async ({ _eventId, _chronogramId }, body) => {
  const event = await eventsRepository.getByFields({
    _id: _eventId,
    [chronogram._id]: _chronogramId,
  })
  if (!event) {
    const error = new Error('No se encontro un evento con el ID')
    error.status = 404
    throw error
  }
  const updatedChronogram = await eventsRepository.updateChronogram(
    { _eventId, _chronogramId },
    body
  )
  if (!updatedChronogram) {
    const error = new Error('No se pudo actualizar el cronograma')
    error.status = 404
    throw error
  }
  return updatedChronogram
}
const removeChronogram = async (params) => {
  const { _eventId, _chronogramId } = params
  const event = await eventsRepository.getByFields({
    _id: _eventId,
    'chronogram._id': _chronogramId,
  })
  console.log(event)
  if (!event) {
    const error = new Error('No se encontro un evento con el ID')
    error.status = 404
    throw error
  }
  const chronogram = await eventsRepository.removeChronogram({
    _eventId,
    _chronogramId,
  })
  if (!event) {
    const error = new Error('No se puede eliminar el cronograma')
    error.status = 404
    throw error
  }
  return chronogram
}

export default {
  getById,
  update,
  updateImage,
  create,
  getAll,
  remove,
  createChronogram,
  updateChronogram,
  removeChronogram,
}
