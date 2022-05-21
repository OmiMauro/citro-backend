import { Token } from '../models/token.js'

const getById = async (id) => {
	return await Token.findById(id)
}

const getToken = async (query) => {
	return await Token.findOne({ $where: query })
}
const create = async (token) => {
	return await Token.create(token)
}
const remove = async (id) => {
	return await Token.findByIdAndDelete(id)
}

export default { getById, create, getToken, remove }
