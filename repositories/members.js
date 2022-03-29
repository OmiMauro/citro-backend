import { Members } from '../models/members.js'

const getById = async (id) => {
  return await Members.findById(id)
}
const update = async (id, member) => {
  return await Members.findByIdAndUpdate(id, member)
}
const create = async (member) => {
  return await Members.create(member)
}
const getAll = async () => {
  return await Members.find({})
}
const remove = async (id) => {
  return await Members.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove }
