import membersRepository from '../repositories/members.js'
import filesModule from '../modules/files.js'
import imagesRepository from '../repositories/images.js'

const getById = async id => {
  const member = await membersRepository.getById(id)
  if (!member) {
    const error = new Error('No se encontro un organizador con el ID')
    error.status = 404
    throw error
  }
  return member
}
const update = async (id, body) => {
  const member = await membersRepository.update(id, body)
  if (!member) {
    const error = new Error('No se encontro un organizador con el ID')
    error.status = 404
    throw error
  }
  return member
}
const create = async (body, imageFile) => {
  const imageUpload = await filesModule.uploadFile(imageFile, 'members')
  const image = await imagesRepository.create(imageUpload)
  body.image_id = image.id
  const member = await membersRepository.create(body)
  if (!member || !imageUpload || !image) {
    const error = new Error('No se pudo crear al organizador')
    error.status = 400
    throw error
  }
  return member
}
const getAll = async () => {
  const members = await membersRepository.getAll()
  if (!members) {
    const error = new Error('No se encontraron todos los organizadores')
    error.status = 400
    throw error
  }
  return members
}
const remove = async id => {
  const member = await membersRepository.remove(id)
  if (!member) {
    const error = new Error('No se encontro un organizador con el ID')
    error.status = 404
    throw error
  }
  return member
}

export default { getById, update, create, getAll, remove }
