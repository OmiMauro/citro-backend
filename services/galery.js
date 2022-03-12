import galeryRepository from '../repositories/galery.js'
import imagesRepository from '../repositories/images.js'
import filesModule from '../modules/files.js'

const getById = async (id) => {
  const galery = await galeryRepository.getById(id)
  if (!galery) {
    const error = new Error('No se pudo encontrar el ID')
    error.status = 404
    throw error
  }
  return galery
}
const update = async (id, image) => {
  const galery = await galeryRepository.update(id, image)
  if (!galery) {
    const error = new Error('No se pudo encontrar el ID')
    error.status = 404
    throw error
  }
  return galery
}
const create = async (imageFile) => {
  const imageUpload = await filesModule.uploadFile(imageFile)
  const image = await imagesRepository.create(imageUpload)
  const galery = await galeryRepository.create(image._id)
  if (!galery || !image || !imageUpload) {
    const error = new Error('No se pudo agregar la imagen')
    error.status = 400
    throw error
  }
  return galery
}
const getAll = async () => {
  const galery = await galeryRepository.getAll()
  if (!galery) {
    const error = new Error('No se pudo encontrar imagenes')
    error.status = 400
    throw error
  }
  return galery
}
const remove = async id => {
  const galery = await galeryRepository.remove(id)
  if (!galery) {
    const error = new Error('No se pudo encontrar el ID')
    error.status = 404
    throw error
  }
  return galery
}

export default { getById, update, create, getAll, remove }
