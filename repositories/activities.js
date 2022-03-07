import { Activities } from '../models/activities.js'

const getById = async (id) => {
  return await Activities.findById(id)
}
const update = async (id, car) => {
  return await Activities.findByIdAndUpdate(id, car)
}
const create = async (car) => {
  return await Activities.create(car)
}
const getAll = async () => {
  return await Activities.find({})
}
const remove = async (id) => {
  return await Activities.findByIdAndRemove(id)
}
const activitiesRepository = { getById, update, create, getAll, remove }
export default activitiesRepository
