import carsRepository from '../repositories/cars.js'

const getById = async (id) => {
  return await carsRepository.getById(id)
}
const update = async (id, car) => {
  return await carsRepository.update(id, car)
}
const create = async (car) => {
  return await carsRepository.create(car)
}
const getAll = async () => {
  return await carsRepository.getAll()
}
const remove = async id => {
  return await carsRepository.remove(id)
}

export default { getById, update, create, getAll, remove }
