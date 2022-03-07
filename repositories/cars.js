import { Cars } from '../models/cars.js'

const getById = async (id) => {
  return await Cars.findById(id)
}
const update = async (id, car) => {
  return await Cars.findByIdAndUpdate(id, car)
}
const create = async (car) => {
  return await Cars.create(car)
}
const getAll = async () => {
  return await Cars.find({})
}
const remove = async (id) => {
  return await Cars.findByIdAndRemove(id)
}
const carsRepository = { getById, update, create, getAll, remove }
export default carsRepository
