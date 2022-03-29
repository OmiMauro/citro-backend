import { News } from '../models/news.js'

const getById = async (id) => {
  return await News.findById(id)
}
const update = async (id, news) => {
  return await News.findByIdAndUpdate(id, news)
}
const create = async (news) => {
  return await News.create(news)
}
const getAll = async () => {
  return await News.find({})
}
const remove = async (id) => {
  return await News.findByIdAndRemove(id)
}

export default { getById, update, create, getAll, remove }
