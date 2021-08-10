import mercadopago from 'mercadopago'

mercadopago.configure({
  access_token: `${process.env.ACCESS_TOKEN_MP}`
})

/* const createPreference = async (req, res) => {
  const preference = {
    statement_descriptor: 'Encuentro de Autos CitroRodando',
    items: [{
      title: 'Inscripción al Encuentro de Autos Citro',
      unit_price: 1000,
      quantity: 1
    }],
    back_urls: {
      success: `${process.env.NAME_APPLICATION}/feedback`,
      failure: `${process.env.NAME_APPLICATION}/feedback`,
      pending: `${process.env.NAME_APPLICATION}/feedback`
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_types: [
        { ticket: 'ticket' }
      ]
    }
  }
  const response = await mercadopago.preferences.create(preference)
  console.log(response)
  if (response) {
    res.json(response)
  } */
const preference = {
  statement_descriptor: 'Encuentro de Autos CitroRodando',
  items: [{
    title: 'Inscripción al Encuentro de Autos Citro',
    unit_price: 1000,
    quantity: 1
  }],
  back_urls: {
    success: `${process.env.NAME_APPLICATION}/feedback`,
    failure: `${process.env.NAME_APPLICATION}/feedback`,
    pending: `${process.env.NAME_APPLICATION}/feedback`
  },
  auto_return: 'approved',
  payment_methods: {
    excluded_payment_types: [
      { ticket: 'ticket' }
    ]
  }
}
const createPreference = async (req, res) => {
  mercadopago.preferences.create(preference)
    .then(function (response) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      res.json(response)
    }).catch(function (error) {
      console.log(error)
    })
}

const feedback = (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  })
}
export { createPreference, feedback }
