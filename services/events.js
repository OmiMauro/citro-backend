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
const updateHotelById = async (params, body) => {
  const event = await eventsRepository.getById(params.id)
  if (!event) {
    const error = new Error('No se encontro un evento con el ID')
    error.status = 404
    throw error
  }
  const updatedEvent = await eventsRepository.updateSubdocument(
    { _id: params.id, subDocID: params.subDocID },
    'hotels',
    body
  )
  return updatedEvent
}

export default {
  getById,
  update,
  updateImage,
  create,
  getAll,
  remove,
  updateHotelById,
}
