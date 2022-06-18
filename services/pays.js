import paysRepository from '../repositories/pays.js'
const getById = async (id) => {
  const pay = await paysRepository.getById(id)
  if (!pay) {
    const error = new Error('No se encontro el pago')
    error.status = 404
    throw error
  }
  return pay
}
const update = async (id, _userId, body) => {
  const pay = await paysRepository.getById(id)
  if (!pay) {
    const error = new Error('No se encontro el pago')
    error.status = 404
    throw error
  }
  body = { ...body, modifiedBy: _userId }
  const updatedPay = await paysRepository.update(id, body)
  if (!updatedPay) {
    const error = new Error('No se pudo actualizar el pago')
    error.status = 400
    throw error
  }
  return updatedPay
}

export default { getById, update }
