import ordersRepository from '../repositories/orders.js'
import mpModule from '../modules/mercadopago.js'

const createPreference = async () => {
  const preference = await mpModule.createPreference({})
}
const updatePayment = async () => {}

const getPayment = async () => {}
export default { createPreference, updatePayment, getPayment }
/* const preference = await mercadopago.preferences.create({
  external_reference: orderSaved._id.toString(),
  statement_descriptor,
  notification_url: `${process.env.NAME_APPLICATION}/api/mercadopago/webhook?source_news=webhooks`,
  back_urls: {
    success: `${process.env.NAME_APPLICATION}/success`,
    pending: `${process.env.NAME_APPLICATION}/pending`,
    failure: `${process.env.NAME_APPLICATION}/rejected`,
  },
  items: [
    {
      title: `DNI: ${DNI}`,
      unit_price,
      quantity: 1,
      currency_id: 'ARS',
      description: `Inscripción para el encuentro de Citroen del DNI: ${DNI}`,
    },
  ],
  payer: {
    name: name,
    surname: lastname,
    email: email,
    identification: {
      type: 'DNI',
      number: DNI,
    },
  },
  expires: true,
  date_of_expiration: '2021-11-20T00:00:00.000-04:00',
})
 */
