import { Organizations } from '../models/organization.js'

const getById = async (id) => {
	return await Organizations.findById(id).populate(
		'image_id',
		'public_id url secure_url height width'
	)
}
const update = async (id, organization) => {
	return await Organizations.findByIdAndUpdate(id, organization)
}
const create = async (organization) => {
	return await Organizations.create(organization)
}

export default { getById, update, create }
