import express from 'express'
import { createPreference, feedback } from '../controllers/mercadopagoController.js'
const Router = express.Router()

Router.post('/create_preference', createPreference)

Router.get('/feedback', feedback)

export default Router
