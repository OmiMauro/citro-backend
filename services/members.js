import membersRepository from '../repositories/members.js'

const getById = async (id) => {
  return await membersRepository.getById(id)
}
const update = async (id, organization) => {
  return await membersRepository.update(id, organization)
}
const create = async (organization) => {
  return await membersRepository.create(organization)
}
const getAll = async () => {
  return await membersRepository.getAll()
}
const remove = async id => {
  return await membersRepository.remove(id)
}

const membersService = { getById, update, create, getAll, remove }
export default membersService
