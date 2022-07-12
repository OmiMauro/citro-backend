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
const getAll = async (_eventId, { page = 1, limit = 10 }) => {
  return await Inscriptions.paginate(
    { _eventId },
    {
      page,
      limit,
      populate: [
        { path: '_eventId', select: 'name' },
        { path: '_userId', select: 'name lastname' },
        { path: '_orderId' },
      ],
    }
  )
}
const existsInscription = async (_eventId, _userId) => {
  return await Inscriptions.find({ _eventId, _userId })
}
export default { getById, update, create, getAll, existsInscription }
