import express from 'express'
import {
  addInscription, listInscriptions, inscriptionsApproved, inscriptionsPending,
  inscriptionsRejected, getInscripcionByDNI, deleteAllInscriptionsAndOrders
} from '../controllers/inscriptionController.js'
import { inscriptionValidator, getInscriptionValidator } from '../validator/index.js'
import { requireSignin, isAdmin, isAuth } from '../controllers/authController.js'
import { userById } from '../controllers/userController.js'
const Router = express.Router()

Router.post('/inscription', inscriptionValidator, addInscription)
Router.get('/inscription', getInscriptionValidator, getInscripcionByDNI)
/* Router.delete('/inscription/:userId', requireSignin, isAdmin, deleteAllInscriptionsAndOrders) */
Router.get('/inscription/:userId', requireSignin, isAdmin, listInscriptions)
Router.get('/inscription/approved/:userId', requireSignin, isAdmin, inscriptionsApproved)
Router.get('/inscription/rejected/:userId', requireSignin, isAdmin, inscriptionsRejected)
Router.get('/inscription/pending/:userId', requireSignin, isAdmin, inscriptionsPending)
Router.get('/inscription')
Router.param('userId', userById)
export default Router
