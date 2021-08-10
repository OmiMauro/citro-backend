import express from 'express'
import { createPreference, feedback, webhook } from '../controllers/mercadopagoController.js'
const Router = express.Router()

Router.post('/mercadopago/create_preference', createPreference)
Router.post('/mercadopago/webhook', webhook)
Router.get('/feedback', feedback)

export default Router
