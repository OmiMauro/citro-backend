
import { Inscriptions } from '../models/inscriptions.js'

const getById = async (id) => {
  return await Inscriptions.findById(id)
}
const update = async (id, inscription) => {
  return await Inscriptions.findByIdAndUpdate(id, inscription)
}
const create = async (inscription) => {
  return await Inscriptions.create(inscription)
}
const getAll = async () => {
  return await Inscriptions.find({})
}
export default { getById, update, create, getAll }
