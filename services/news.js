import newsRepository from '../repositories/news.js'

const getById = async (id) => {
  return await newsRepository.getById(id)
}
const update = async (id, new) => {
  return await newsRepository.update(id, new)
}
const create = async (new) => {
  return await newsRepository.create(new)
}
const getAll = async () => {
  return await newsRepository.getAll()
}
const remove = async id => {
  return await newsRepository.remove(id)
}
const newsServices = { getById, update, create, getAll, remove }
export default newsServices
