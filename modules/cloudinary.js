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
const deleteFile = async (publicId) => {
	return await v2.uploader.destroy(publicId)
}

export default { uploadFile, deleteFile }
