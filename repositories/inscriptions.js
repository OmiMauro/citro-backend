import Inscriptions from '../models/inscriptions.js'

const getById = async (id) => {
  return await Inscriptions.findById(id).populate('_orderId').lean()
}
const update = async (id, inscription) => {
  return await Inscriptions.findByIdAndUpdate(id, inscription, { new: true })
}
const create = async (inscription) => {
  return await Inscriptions.create(inscription)
}
const getAll = async (search) => {
  return await Inscriptions.find(search, {})
    .populate('_eventId', 'name')
    .populate('_userId', 'name lastname')
    .populate('_orderId')
    .lean()
}
const existsInscription = async (_eventId, _userId) => {
  return await Inscriptions.find({ _eventId, _userId })
}
const getAllInscriptionsPaginate = async (search, { page, limit }) => {
  return await Inscriptions.paginate(search, {
    page,
    limit,
    populate: [
      { path: '_eventId', select: 'name' },
      { path: '_userId', select: 'name lastname' },
      { path: '_orderId' },
    ],
    lean: true,
  })
}
export default {
  getById,
  update,
  create,
  getAll,
  existsInscription,
  getAllInscriptionsPaginate,
}
