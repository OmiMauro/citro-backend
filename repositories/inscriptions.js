import Inscriptions from '../models/inscriptions.js'

const getById = async (id) => {
  return await Inscriptions.findById(id).populate('_payId').lean()
}
const update = async (id, inscription) => {
  return await Inscriptions.findByIdAndUpdate(id, inscription, { new: true })
}
const create = async (inscription) => {
  return await Inscriptions.create(inscription)
}
const getAll = async (_eventId) => {
  return await Inscriptions.find({ _eventId })
    .populate('_payId')
    .populate('_userId', 'name lastname')
    .populate('_eventId', 'name')
    .lean()
}
const existsInscription = async (_eventId, _userId) => {
  return await Inscriptions.find({ _eventId, _userId })
}
export default { getById, update, create, getAll, existsInscription }
