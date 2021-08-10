import express from 'express'
import { addInscription, listInscriptions } from '../controllers/inscriptionController.js'
import { inscriptionValidator } from '../validator/index.js'
import { requireSignin, isAdmin, isAuth } from '../controllers/authController.js'
import { userById } from '../controllers/userController.js'
const Router = express.Router()

Router.post('/inscription', inscriptionValidator, addInscription)
Router.get('/inscription/:userId', requireSignin, isAdmin, listInscriptions)

Router.param('userId', userById)
export default Router
