import inscriptionsRepository from '../repositories/inscriptions.js'

const getById = async (id) => {
  return await inscriptionsRepository.getById(id)
}
const update = async (id, inscription) => {
  return await inscriptionsRepository.update(id, inscription)
}
const create = async (inscription) => {
  return await inscriptionsRepository.create(inscription)
}
const getAll = async () => {
  return await inscriptionsRepository.getAll()
}
const remove = async id => {
  return await inscriptionsRepository.remove(id)
}

export default { getById, update, create, getAll, remove }
