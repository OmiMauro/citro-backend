import rolesRepository from '../repositories/roles.js'

const getById = async (id) => {
  return await rolesRepository.getById(id)
}
const update = async (id, role) => {
  return await rolesRepository.update(id, role)
}
const create = async (role) => {
  return await rolesRepository.create(role)
}
const getAll = async () => {
  return await rolesRepository.getAll()
}
const remove = async id => {
  return await rolesRepository.remove(id)
}
const rolesServices = { getById, update, create, getAll, remove }
export default rolesServices
