import Pays from '../models/pays.js'

const getById = async (id) => {
  return await Pays.findById(id).populate('_modifiedBy', 'name lastname')
}
const update = async (id, pay) => {
  return await Pays.findByIdAndUpdate(id, pay, { new: true }).populate(
    '_modifiedBy name lastname'
  )
}
const create = async (pay) => {
  return await Pays.create(pay)
}
const getAll = async () => {
  return await Pays.find({})
}

export default { getById, update, create, getAll }
