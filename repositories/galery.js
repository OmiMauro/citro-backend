import { Galery } from '../models/galery.js'

const getById = async (id) => {
  return await Galery.findById(id)
}
const update = async (id, image) => {
  return await Galery.findByIdAndUpdate(id, image)
}
const create = async (image) => {
  return await Galery.create(image)
}
const getAll = async () => {
  return await Galery.find({})
}
const remove = async (id) => {
  return await Galery.findByIdAndRemove(id)
}
const galerysRepository = { getById, update, create, getAll, remove }
export default galerysRepository
