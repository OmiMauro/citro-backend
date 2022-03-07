import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  folders: 'images',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [
    {
      gravity: 'faces',
      crop: 'thumb',
      quality: '70'
    }
  ]
})
const upload = multer({ storage })
export { upload }
