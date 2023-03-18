import { Galery } from '../models/galery.js'
import config from '../config/config.js'
const getById = async (id) => {
  return await Galery.findById(id).populate('image_id', '_id url secure_url')
}
const update = async (id, image) => {
  return await Galery.findByIdAndUpdate(id, image)
}
const create = async (imageId) => {
  return await Galery.create({ image_id: imageId })
}
const getAll = async (page = 1) => {
  page = parseInt(page)
  return await Galery.paginate(
    {},
    { page, limit: config.limitPagination || 10, populate: 'image_id' }
  )
}
const remove = async (id) => {
  return await Galery.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove }
