import usersRepository from '../repositories/users.js'

const getById = async (id) => {
  return await usersRepository.getById(id)
}
const update = async (id, user) => {
  return await usersRepository.update(id, user)
}
const create = async (user) => {
  return await usersRepository.create(user)
}
const getAll = async () => {
  return await usersRepository.getAll()
}
const remove = async id => {
  return await usersRepository.remove(id)
}
const usersServices = { getById, update, create, getAll, remove }

export default usersServices
