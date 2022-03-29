import organizationRepository from '../repositories/organizations.js'
import filesModule from '../modules/files.js'
import imagesRepository from '../repositories/images.js'

const getById = async (id) => {
  const organization = await organizationRepository.getById(id)
  if (!organization) {
    const error = new Error('No se pudo encontrar la organizacion con el ID')
    error.status = 404
    throw error
  }
  return organization
}
const update = async (id, body) => {
  const organization = await organizationRepository.update(id, body)
  if (!organization) {
    const error = new Error('No se pudo encontrar la organizacion con el ID')
    error.status = 404
    throw error
  }
  return organization
}
const create = async (body, imageFile) => {
  const imageUpload = await filesModule.uploadFile(imageFile, 'organization')
  const image = await imagesRepository.create(imageUpload)
  body.image_id = image.id
  const organization = await organizationRepository.create(body)
  if (!organization) {
    const error = new Error('No se puede crear la organizacion')
    error.status = 400
    throw error
  }
  return organization
}

export default { getById, update, create }
