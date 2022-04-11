import { Users } from '../models/users.js'

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
const getByEmail = async (email) => {
	const exists = await Users.exists({ email })
	return exists ? await Users.findById(exists._id) : null
}
export default { getById, update, create, getAll, getByEmail }
