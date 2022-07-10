import mercadopago from 'mercadopago'
import config from '../config/config.js'

mercadopago.configure({
  access_token: config.mercadopago.access_token,
})

const createPreference = (preference) => {
  return mercadopago.preferences.create({
    ...preference,
    notification_url: `${config.nameApp.api}/orders/webhook?source_news=webhooks`,
    back_urls: {
      success: `${config.nameApp.app}`,
      pending: `${config.nameApp.app}`,
      failure: `${config.nameApp.app}`,
    },
  })
}
const getPayment = async (id) => {
  const response = await mercadopago.payment.get(id)
  return response
}
export default { createPreference, getPayment }
