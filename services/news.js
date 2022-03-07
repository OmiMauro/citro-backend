import newsRepository from '../repositories/news.js'

const getById = async (id) => {
  return await newsRepository.getById(id)
}
const update = async (id, news) => {
  return await newsRepository.update(id, news)
}
const create = async (news) => {
  return await newsRepository.create(news)
}
const getAll = async () => {
  return await newsRepository.getAll()
}
const remove = async id => {
  return await newsRepository.remove(id)
}
const newsServices = { getById, update, create, getAll, remove }
export default newsServices
