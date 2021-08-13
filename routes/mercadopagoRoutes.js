import express from 'express'
import { createPreference, webhook } from '../controllers/mercadopagoController.js'
import { inscriptionValidator } from '../validator/index.js'

const Router = express.Router()

Router.post('/mercadopago/create_preference', inscriptionValidator, createPreference)
Router.post('/mercadopago/webhook', webhook)

export default Router
