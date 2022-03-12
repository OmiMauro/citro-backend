import cloudinary from './cloudinary.js'
import path from 'path'
import fs from 'fs'

const uploadFile = async (file, deleteTempFile = true) => {
  const fileToCreate = {
    path: file.path,
    ext: path.extname(file.originalname),
    contentType: file.mimetype
  }
  try {
    const fileUploadedToCloud = await cloudinary.uploadFile(fileToCreate)
    if (deleteTempFile) {
      try {
        await deleteLocalFile(file.path)
      } catch (error) {
        console.error('error to remove file', error)
      }
    }
    return fileUploadedToCloud
  } catch (error) {
    console.error('error to remove file', error)
  }
}

const deleteLocalFile = async filePath => await fs.promises.unlink(filePath)

export default { uploadFile }
