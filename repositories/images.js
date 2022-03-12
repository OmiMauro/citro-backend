import { Image } from '../models/images.js'

const getById = async (id) => {
  return await Image.findById(id)
}
const update = async (id, image) => {
  return await Image.findByIdAndUpdate(id, image)
}
const create = async (image) => {
  return await Image.create(image)
}
const getAll = async () => {
  return await Image.find({})
}
const remove = async (id) => {
  return await Image.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove }
