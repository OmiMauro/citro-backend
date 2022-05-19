import { Token } from '../models/token.js'

const getById = async (id) => {
	return await Token.findById(id)
}
const getByToken = async (token) => {
	return await Token.find({ $where: { token } })
}

const create = async (token) => {
	return await Token.create(token)
}

export default { getById, create, getByToken }
