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

export { getById, update, create, getAll }
