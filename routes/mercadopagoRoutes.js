import express from 'express'
import { createPreference, feedback, ipn } from '../controllers/mercadopagoController.js'
const Router = express.Router()

Router.post('/mercadopago/create_preference', createPreference)
Router.post('/mercadopago/ipn/:type/:data.id', ipn)
Router.get('/feedback', feedback)

export default Router
