import Events from '../models/events.js'

const getById = async (id) => {
	return await Events.findById(id)
}
const update = async (id, event) => {
	return await Events.findByIdAndUpdate(id, event)
}
const create = async (event) => {
	return await Events.create(event)
}
const getAll = async () => {
	return await Events.find({})
}
const remove = async (id) => {
	return await Events.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove }
