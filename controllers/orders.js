import ordersServices from '../services/orders.js'

const create = async (req, res) => {
  try {
    const order = await ordersServices.create(
      req.authUser,
      req.params.inscriptionId
    )
    return res
      .status(201)
      .json({ msg: 'Ingrese a la URL para realizar el pago', data: order })
  } catch (error) {
    console.log(error)
    res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}
const webhook = async (req, res) => {
  try {
    if (req.query.type === 'payment') {
      res.status(200).end()
      let id = req.query[data.id]
      const order = await ordersServices.update(id, query)
    }
  } catch (error) {
    return res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}
const getById = async (req, res) => {
  try {
    const order = await ordersServices.get(req.params.orderId)
    return res.status(201).json({
      data: order,
    })
  } catch (error) {
    res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}
export default { create, webhook, getById }
/* if (req.query.type === 'payment') {
      const id = req.query['data.id']
      const findPay = await findPayMP(id)
      if (findPay.statusText === 'OK') {
        await updateOrderDB(findPay)
      }
    } */
