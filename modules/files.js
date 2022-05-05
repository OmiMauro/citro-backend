import cloudinary from './cloudinary.js'
import path from 'path'
import fs from 'fs'

const uploadFile = async (file, deleteTempFile = true, folder) => {
	const fileToCreate = {
		path: file.path,
		ext: path.extname(file.originalname),
		contentType: file.mimetype
	}
	try {
		folder = `/citros/${folder}`
		const fileUploadedToCloud = await cloudinary.uploadFile(
			fileToCreate,
			folder
		)
		if (deleteTempFile || !fileUploadedToCloud) {
			try {
				await deleteLocalFile(file)
			} catch (error) {
				console.error('error to remove file', error)
			}
		}
		return fileUploadedToCloud
	} catch (error) {
		console.error('error to remove file', error)
	}
}

const deleteLocalFile = async (filePath) => {
	return await fs.promises.unlink(filePath.path)
}

const deleteFileFromCloudinary = async (publicId) => {
	return await cloudinary.deleteFile(publicId)
}
export default {
	uploadFile,
	deleteLocalFile,
	deleteFileFromCloudinary
}
