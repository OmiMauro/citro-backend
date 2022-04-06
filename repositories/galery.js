import { Galery } from '../models/galery.js'

const getById = async (id) => {
	return await Galery.findById(id)
}
const update = async (id, image) => {
	return await Galery.findByIdAndUpdate(id, image)
}
const create = async (imageId) => {
	return await Galery.create({ image_id: imageId })
}
const getAll = async () => {
	await Galery.find({}).populate('image_id')
}
const remove = async (id) => {
	return await Galery.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove }
