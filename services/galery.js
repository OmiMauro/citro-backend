import galeryRepository from '../repositories/galery.js'
import imagesRepository from '../repositories/images.js'
import filesModule from '../modules/files.js'
import cloudinary from '../modules/cloudinary.js'

const getById = async (id) => {
	const galery = await galeryRepository.getById(id)
	if (!galery) {
		const error = new Error('No se pudo encontrar el ID')
		error.status = 404
		throw error
	}
	return galery
}
const update = async (id, image) => {
	const { text } = image
	const galery = await galeryRepository.update(id, { text })
	if (!galery) {
		const error = new Error('No se pudo encontrar el ID')
		error.status = 404
		throw error
	}
	return galery
}
const create = async (body, files) => {
	const allPics = []
	for (let i = 0; i < files.length; i++) {
		const imageUpload = await filesModule.uploadFile(files[i], true, 'galery')
		const image = await imagesRepository.create(imageUpload)
		const galery = await galeryRepository.create(image._id)
		if (!galery || !image) {
			await filesModule.deleteLocalFile(item)
			const error = new Error('No se pudo agregar la imagen')
			error.status = 400
			throw error
		}
		allPics.push(galery)
	}
	return allPics
}

const getAll = async (page) => {
	const galery = await galeryRepository.getAll(page)
	if (!galery) {
		const error = new Error('No se pudo encontrar imagenes')
		error.status = 400
		throw error
	}
	return galery
}
const remove = async (id) => {
	const galery = await galeryRepository.getById(id)
	if (!galery) {
		const error = new Error('No se pudo encontrar el ID')
		error.status = 404
		throw error
	}
	const fileRemove = await cloudinary.deleteFile(galery.image_id)
	if (!fileRemove) {
		const error = new Error('Ocurrio un error al eliminar la imagen.')
		error.status = 400
		throw error
	}
	const imageRemove = await imagesRepository.remove(galery.image_id)
	const galeryRemove = await galeryRepository.remove(id)
	return galeryRemove
}

export default { getById, update, create, getAll, remove }
