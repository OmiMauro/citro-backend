import { Images } from '../models/images.js'

const getById = async (id) => {
  return await Images.findById(id)
}
const update = async (id, image) => {
  return await Images.findByIdAndUpdate(id, image)
}
const create = async (image) => {
  return await Images.create(image)
}
const getAll = async () => {
  return await Images.find({})
}
const remove = async (id) => {
  return await Images.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove }
