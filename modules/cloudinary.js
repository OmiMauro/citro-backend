import { v2 } from 'cloudinary'
import config from '../config/config.js'
import fs from 'fs'

const { cloudinary } = config

v2.config({
	cloud_name: cloudinary.cloud_name,
	api_key: cloudinary.api_key,
	api_secret: cloudinary.api_secret
})

const uploadFile = async (file, folder = 'citros') => {
	try {
		/* const fileStream = fs.createReadStream(file.path)
    // const fileName = file.split('/')[3] + file.ext
    const fileContenType = file.contentType */
		const { path } = file

		const response = await v2.uploader.upload(path, { folder })
		return response
	} catch (error) {
		console.log(error)
	}
}

const deleteFile = async (image_id) => {
	try {
		const image = await imagesRepository.getById(image_id)
		if (!image) {
			const error = new Error('No se encontro una imagen con el ID')
			error.status = 404
			throw error
		}
		return await v2.uploader.destroy(publicId)
	} catch (error) {
		const err = new Error(error.message)
		err.status = 500
		throw err
	}
}

export default { uploadFile, deleteFile }
