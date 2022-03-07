import { News } from '../models/news.js'

const getById = async (id) => {
  return await News.findById(id)
}
const update = async (id, new) => {
  return await News.findByIdAndUpdate(id, new)
}
const create = async (new) => {
  return await News.create(new)
}
const getAll = async () => {
  return await News.find({})
}
const remove = async (id) => {
  return await News.findByIdAndRemove(id)
}
const newsRepository ={ getById, update, create, getAll, remove }

export default newsRepository