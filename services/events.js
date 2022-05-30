import filesModule from '../modules/files.js'
import eventsRepository from '../repositories/events.js'
import imagesRepository from '../repositories/images.js'

const getById = async (id) => {
	const event = await eventsRepository.getById(id)
	if (!event) {
		const error = new Error('No se encontro el evento')
		error.status = 404
		throw error
	}
	return event
}
const update = async (id, body) => {
	const event = await eventsRepository.update(id, body)
	if (!event) {
		const error = new Error('No se puedo actualizar el evento')
		error.status = 400
		throw error
	}
	return event
}
const updateImage = async (id, imageFile) => {
	const event = await eventsRepository.getById(id)
	if (!event) {
		await filesModule.deleteLocalFile(imageFile)
		const error = new Error('No se encontro un evento con el ID')
		error.status = 404
		throw error
	}

	const imageUpload = await filesModule.uploadFile(imageFile, true, 'events')
	if (!imageUpload) {
		await filesModule.deleteLocalFile(imageFile)
	}
	const image = await imagesRepository.update(event.image_id, imageUpload)
	if (!image) {
		await cloudinary.deleteFile(imageUpload.public_id)
	}
	return event
}

const create = async (body, imageFile) => {
	const imageUpload = await filesModule.uploadFile(imageFile, true, 'events')
	if (!imageUpload) {
		await filesModule.deleteLocalFile(imageFile)
	}
	const image = await imagesRepository.create(imageUpload)
	event.image_id = image._id
	const event = await eventsRepository.create(body)
	if (!event) {
		await cloudinary.deleteFile(image._id)
		const error = new Error('No se puede crear el evento')
		error.status = 400
		throw error
	}
	organization
	return event
}
const getAll = async () => {
	const events = await eventsRepository.getAll()
	if (!events) {
		const error = new Error('No se encontraron eventos')
		error.status = 404
		throw error
	}
	return events
}
const remove = async (id) => {
	const event = await eventsRepository.remove(id)
	if (!event) {
		const error = new Error('No se pudo eliminar el evento')
		error.status = 404
		throw error
	}
	return event
}

export default { getById, update, updateImage, create, getAll, remove }
