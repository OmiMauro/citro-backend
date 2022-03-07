import galeryRepository from '../repositories/galery.js'

const getById = async (id) => {
  return await galeryRepository.getById(id)
}
const update = async (id, image) => {
  return await galeryRepository.update(id, image)
}
const create = async (image) => {
  return await galeryRepository.create(image)
}
const getAll = async () => {
  return await galeryRepository.getAll()
}
const remove = async id => {
  return await galeryRepository.remove(id)
}
const galeryServices = { getById, update, create, getAll, remove }

export default galeryServices
