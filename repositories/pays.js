import { Pays } from '../models/pays.js'

const getById = async (id) => {
	return await Pays.findById(id)
}
const update = async (id, pay) => {
	return await Pays.findByIdAndUpdate(id, pay)
}
const create = async (pay) => {
	return await Pays.create(pay)
}
const getAll = async () => {
	return await Pays.find({})
}
const remove = async (id) => {
	return await Pays.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove }
