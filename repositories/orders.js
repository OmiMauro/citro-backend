import Orders from '../models/orders.js'

const create = async (order) => {
  return await Orders.create(order)
}
const update = async (id, order) => {
  return await Orders.findByIdAndUpdate(id, order, { new: true }).lean()
}
const getById = async (id) => {
  return await Orders.findById(id)
}
const getAll = async () => {}

export default { create, update, getAll, getById }
