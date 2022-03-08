import { Roles } from '../models/roles.js'

const getById = async (id) => {
  return await Roles.findById(id)
}
const update = async (id, role) => {
  return await Roles.findByIdAndUpdate(id, role)
}
const create = async (role) => {
  return await Roles.create(role)
}
const getAll = async () => {
  return await Roles.find({})
}
const remove = async id => {
  return await Roles.findByIdAndRemove(id)
}
const rolesRepository = { getById, update, create, getAll, remove }
export default rolesRepository
