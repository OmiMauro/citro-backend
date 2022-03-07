import slidesRepository from '../repositories/slides.js'

const getById = async (id) => {
  return await slidesRepository.getById(id)
}
const update = async (id, organization) => {
  return await slidesRepository.update(id, organization)
}
const create = async (organization) => {
  return await slidesRepository.create(organization)
}
const getAll = async () => {
  return await slidesRepository.getAll()
}
const remove = async id => {
  return await slidesRepository.remove(id)
}
const slidesServices = { getById, update, create, getAll, remove }

export default slidesServices
