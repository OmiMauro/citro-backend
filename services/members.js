import membersRepository from '../repositories/members.js'
import filesModule from '../modules/files.js'
import imagesRepository from '../repositories/images.js'

const removeImageFromCloudinary = async (member) => {
	try {
		const image = await imagesRepository.getById(member.image_id)
		if (image) {
			const imageRemove = await filesModule.deleteFileFromCloudinary(
				image.public_id
			)
			return imageRemove
		}
	} catch (error) {
		const err = new Error(error.message)
		err.status = 500
		throw err
	}
}
const getById = async (id) => {
	const member = await membersRepository.getById(id)
	if (!member) {
		const error = new Error('No se encontro un organizador con el ID')
		error.status = 404
		throw error
	}
	return member
}
const update = async (id, body) => {
	const { name, lastname, phone, urlFacebook, urlInstagram, urlWhatsapp } = body
	const member = await membersRepository.update(id, {
		name,
		lastname,
		phone,
		urlFacebook,
		urlInstagram,
		urlWhatsapp
	})
	if (!member) {
		const error = new Error('No se encontro un organizador con el ID')
		error.status = 404
		throw error
	}
	return member
}
const updateImage = async (id, imageFile) => {
	const member = await membersRepository.getById(id)
	if (!member) {
		const error = new Error('No se encontro un organizador con el ID')
		error.status = 404
		throw error
	}
	const imageUpload = await filesModule.uploadFile(imageFile, true, 'members')
	const removeImage = await removeImageFromCloudinary(member)
	const image = await imagesRepository.update(member.image_id, imageUpload)

	if (!member || !imageUpload || !image) {
		filesModule.deleteLocalFile(imageFile)
		const error = new Error('No se pudo actualizar la foto del organizador')
		error.status = 400
		throw error
	}

	return member
}
const create = async (body, imageFile) => {
	const imageUpload = await filesModule.uploadFile(imageFile, true, 'members')
	const image = await imagesRepository.create(imageUpload)
	body.image_id = image.id
	const member = await membersRepository.create(body)
	if (!member || !imageUpload || !image) {
		filesModule.removeLocalFile(imageFile)
		const error = new Error('No se pudo crear al organizador')
		error.status = 400
		throw error
	}
	return member
}
const getAll = async () => {
	const members = await membersRepository.getAll()
	if (!members) {
		const error = new Error('No se encontraron todos los organizadores')
		error.status = 400
		throw error
	}
	return members
}
const remove = async (id) => {
	const member = await membersRepository.getById(id)
	if (!member) {
		const error = new Error('No se encontro un organizador con el ID')
		error.status = 404
		throw error
	}
	const fileRemove = await removeImageFromCloudinary(member)
	const imageRemove = await imagesRepository.remove(member.image_id)
	const memberRemove = await membersRepository.remove(id)
	if (!memberRemove) {
		const error = new Error('No se encontro un organizador con el ID')
		error.status = 404
		throw error
	}
	return memberRemove
}

export default { getById, update, create, getAll, remove, updateImage }
