import Events from '../models/events.js'

const getById = async (id) => {
  return await Events.findById(id, '-deleted -deletedAt -createdAt -updatedAt')
}
const update = async (id, event) => {
  return await Events.findByIdAndUpdate(id, event, { new: true })
}

const updateSubdocument = async ({ _id, subDocID }, field, body) => {
  return await Events.findOneAndUpdate(
    { _id: id, 'field._id': subDocID },
    { 'field.$': body },
    { new: true }
  )
}

const create = async (event) => {
  return await Events.create(event)
}
const getAll = async () => {
  return await Events.find({}, '-deleted -deletedAt -createdAt -updatedAt')
    .populate('image_id')
    .lean()
}
const remove = async (id) => {
  return await Events.findByIdAndRemove(id)
}
export default { getById, update, create, getAll, remove, updateSubdocument }
