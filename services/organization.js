import organizationRepository from '../repositories/organizations.js'
import filesModule from '../modules/files.js'
import imagesRepository from '../repositories/images.js'
import config from '../config/config.js'
import cloudinary from '../modules/cloudinary.js'
const getById = async (id) => {
	const organization = await organizationRepository.getById(id)
	if (!organization) {
		const error = new Error('No se pudo encontrar la organizacion con el ID')
		error.status = 404
		throw error
	}
	return organization
}
const update = async (id, body) => {
	const organization = await organizationRepository.update(id, body)
	if (!organization) {
		const error = new Error('No se pudo encontrar la organizacion con el ID')
		error.status = 404
		throw error
	}
	return organization
}
const updateImage = async (id, imageFile) => {
	const organization = await organizationRepository.getById(id)
	if (!organization) {
		await filesModule.deleteLocalFile(imageFile)
		const error = new Error('No se encontro una organizacion con el ID')
		error.status = 404
		throw error
	}
	const imageUpload = await filesModule.uploadFile(
		imageFile,
		true,
		'organization'
	)
	if (!imageUpload) {
		await filesModule.deleteLocalFile(imageFile)
	}
	const image = await imagesRepository.update(
		organization.image_id,
		imageUpload
	)
	if (!image) {
		await cloudinary.deleteFile(imageUpload.public_id)
	}
	return organization
}
const create = async (body, imageFile) => {
	const imageUpload = await filesModule.uploadFile(
		imageFile,
		true,
		'organization'
	)
	if (!imageUpload) {
		await filesModule.deleteLocalFile(imageFile)
	}
	const image = await imagesRepository.create(imageUpload)
	body.image_id = image._id
	const organization = await organizationRepository.create(body)
	if (!organization) {
		cloudinary.deleteFile(image._id)
		const error = new Error('No se puede crear la organizacion')
		error.status = 400
		throw error
	}
	return organization
}

export default { getById, update, create, updateImage }
