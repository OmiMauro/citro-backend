import Events from '../models/events.js'

const getById = async (id) => {
  return await Events.findById(
    id,
    '-deleted -deletedAt -createdAt -updatedAt'
  ).populate('image_id')
}
const update = async (id, event) => {
  return await Events.findByIdAndUpdate(id, event, { new: true })
}

const create = async (event) => {
  return await Events.create(event)
}
const getAll = async () => {
  return await Events.find({}, '-deleted -deletedAt -createdAt -updatedAt')
    .sort({ createdAt: '-1' })
    .populate('image_id')
    .populate('chronogram')
    .lean()
}
const remove = async (id) => {
  return await Events.findByIdAndRemove(id)
}
const getByFields = async (fields) => {
  return await Events.findOne(fields)
}
/* 
const updateChronogram = async ({ _id, subDocID }, field, body) => {
  return await Events.findOneAndUpdate(
    { _id: id, 'field._id': subDocID },
    { 'field.$': body },
    { new: true }
  )
} */

const createChronogram = async (id, chronogram) => {
  return await Events.findByIdAndUpdate(
    id,
    { $push: { chronogram } },
    { new: true }
  )
}
const removeChronogram = async ({ _eventId, _chronogramId }) => {
  return await Events.findOneAndUpdate(
    { _id: _eventId, 'chronogram._id': _chronogramId },
    { $pull: { chronogram: { _id: _chronogramId } } },
    { new: true }
  )
}
const updateChronogram = async ({ _eventId, _chronogramId }, body) => {
  return await Events.findOneAndUpdate(
    { _id: _eventId, 'chronogram.id': _chronogramId },
    {
      $set: {
        'chronogram.$': body,
      },
    },
    { new: true }
  )
}
export default {
  getById,
  update,
  create,
  getAll,
  remove,
  createChronogram,
  removeChronogram,
  updateChronogram,
  getByFields,
}
