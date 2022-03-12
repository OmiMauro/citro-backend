import activitiesRepository from '../repositories/activities.js'

const getById = async (id) => {
  return await activitiesRepository.getById(id)
}
const update = async (id, car) => {
  return await activitiesRepository.update(id, car)
}
const create = async (car) => {
  return await activitiesRepository.create(car)
}
const getAll = async () => {
  return await activitiesRepository.getAll()
}
const remove = async id => {
  return await activitiesRepository.remove(id)
}

export default { getById, update, create, getAll, remove }
