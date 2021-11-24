import express from 'express'
import {
  addImage,
  getAllImages,
  getImageById,
  deleteAllImages
} from '../controllers/imageController.js'
import { upload } from '../services/upload.js'
import { requireSignin, isAdmin } from '../controllers/authController.js'
import { userById } from '../controllers/userController.js'

const Router = express.Router()
// Router.delete('/images', deleteAllImages)
Router.get('/images', getAllImages)
Router.get('/images/:id', getImageById)
Router.post(
  '/images/:userId',
  requireSignin,
  isAdmin,
  upload.array('picture'),
  addImage
)
Router.param('userId', userById)

export default Router
