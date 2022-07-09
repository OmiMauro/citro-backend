import mercadopago from 'mercadopago'
import config from '../config/config.js'

mercadopago.configure({
  access_token: config.mercadopago.access_token,
})

export default mercadopago
