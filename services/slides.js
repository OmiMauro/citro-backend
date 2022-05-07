import slidesRepository from '../repositories/slides.js'
import filesModule from '../modules/files.js'
import imagesRepository from '../repositories/images.js'
import cloudinary from '../modules/cloudinary.js'
import slides from '../repositories/slides.js'

const getById = async (id) => {
	const slide = await slidesRepository.getById(id)
	if (!slide) {
		const error = new Error('No se pudo encontrar el slide con el ID')
		error.status = 404
		throw error
	}
	return slide
}
const update = async (id, body) => {
	const { text, order } = body
	const slide = await slidesRepository.update(id, { text, order })
	if (!slide) {
		const error = new Error('No se pudo encontrar el slide con el ID')
		error.status = 404
		throw error
	}
	return slide
}

const create = async (body, imageFile) => {
	const imageUpload = await filesModule.uploadFile(imageFile, true, 'slides')
	const image = await imagesRepository.create(imageUpload)
	const { order, text } = body
	const slide = await slidesRepository.create({
		order,
		text,
		image_id: image._id
	})
	if (!slide) {
		filesModule.deleteLocalFile(imageFile)
		const error = new Error('No se pudo encontrar el slide con el ID')
		error.status = 404
		throw error
	}
	return slide
}
const getAll = async () => {
	const slide = await slidesRepository.getAll()
	if (!slide) {
		const error = new Error('No se pudo encontrar la organizacion con el ID')
		error.status = 404
		throw error
	}
	return slide
}
const remove = async (id) => {
	const slide = await slidesRepository.getById(id)
	if (!slide) {
		const error = new Error('No se pudo encontrar el slide con el ID')
		error.status = 404
		throw error
	}
	const fileRemove = await cloudinary.deleteFile(slide.image_id)
	const imageRemove = await imagesRepository.remove(slide.image_id)
	const slideRemove = await slidesRepository.remove(slide._id)
	return slideRemove
}

export default { getById, update, create, getAll, remove }
