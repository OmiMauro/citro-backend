import galeryRepository from '../repositories/galery.js'
import imagesRepository from '../repositories/images.js'
import filesModule from '../modules/files.js'

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
	const galery = await galeryRepository.update(id, image)
	if (!galery) {
		const error = new Error('No se pudo encontrar el ID')
		error.status = 404
		throw error
	}
	return galery
}
const create = async (body, files) => {
	const allPics = []
	await files.forEach(async (item) => {
		const imageUpload = await filesModule.uploadFile(item, true, 'galery')
		const image = await imagesRepository.create(imageUpload)
		const galery = await galeryRepository.create(image._id)
		if (!galery || !image || !imageUpload) {
			await filesModule.deleteLocalFile(item)
			const error = new Error('No se pudo agregar la imagen')
			error.status = 400
			throw error
		}
		allPics.push(galery)
	})
	return allPics
}

const getAll = async () => {
	const galery = await galeryRepository.getAll()
	if (!galery) {
		const error = new Error('No se pudo encontrar imagenes')
		error.status = 400
		throw error
	}
	return galery
}
const remove = async (id) => {
	//missing remove image from cloudinary
	const galery = await galeryRepository.remove(id)
	if (!galery) {
		const error = new Error('No se pudo encontrar el ID')
		error.status = 404
		throw error
	}
	return galery
}

export default { getById, update, create, getAll, remove }
