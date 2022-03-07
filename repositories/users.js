import { Users } from '../models/users'

const getById = async (id) => {
  return await Users.findById(id)
}
const update = async (id, user) => {
  return await Users.findByIdAndUpdate(id, user)
}
const create = async (user) => {
  return await Users.create(user)
}
const getAll = async () => {
  return await Users.find({})
}
const usersRepository = { getById, update, create, getAll }
export default usersRepository
