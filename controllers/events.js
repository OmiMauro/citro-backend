import eventsServices from '../services/events.js'

const create = async (req, res, next) => {
  try {
    const event = await eventsServices.create(req.body, req.file)
    return res.status(201).json({ msg: 'El evento fue creado.', data: event })
  } catch (error) {
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const update = async (req, res, next) => {
  try {
    const event = await eventsServices.update(req.params.id, req.body)
    return res
      .status(201)
      .json({ msg: 'El evento fue actualizado.', data: event })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const remove = async (req, res, next) => {
  try {
    const event = await eventsServices.remove(req.params.id)
    return res.status(200).json({
      data: { _id: event._id },
      msg: 'Se elimino con exito el evento',
    })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const getAll = async (req, res, next) => {
  try {
    const events = await eventsServices.getAll(req.params.eventId)
    return res.status(200).json({
      data: events,
    })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const getAllInscriptions = async (req, res) => {
  try {
    const inscriptions = await eventsServices.getAllInscriptions(
      req.params.id,
      req.query
    )
    return res.status(200).json({
      data: inscriptions,
    })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const getById = async (req, res, next) => {
  try {
    const event = await eventsServices.getById(req.params.id)
    return res.status(200).json({ data: event })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const updateImage = async (req, res, next) => {
  try {
    const event = await eventsServices.updateImage(req.params.id, req.file)
    return res
      .status(200)
      .json({ data: event, msg: 'Se actualizo la imagen con exito' })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}

const createChronogram = async (req, res) => {
  try {
    const event = await eventsServices.createChronogram(req.params.id, req.body)
    return res
      .status(200)
      .json({ data: event, msg: 'Se agrego el cronograma con éxito' })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}

const updateChronogram = async (req, res) => {
  try {
    const event = await eventsServices.updateChronogram(
      { _eventId: req.params.id, _chronogramId: req.params.chronogramId },
      req.body
    )
    return res
      .status(200)
      .json({ data: hotel, msg: 'Se actualizo el cronograma con éxito' })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const removeChronogram = async (req, res) => {
  try {
    const event = await eventsServices.removeChronogram({
      _eventId: req.params.id,
      _chronogramId: req.params.chronogramId,
    })
    return res
      .status(200)
      .json({ data: event, msg: 'Se elimino el cronograma con éxito' })
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const getAllInscriptionsPDF = async (req, res) => {
  try {
    const document = await eventsServices.getAllInscriptionsPDF(req.params.id)
    document.pipe(res)
    document.end()
  } catch (error) {
    return res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
export default {
  create,
  update,
  remove,
  getAll,
  getById,
  updateImage,
  createChronogram,
  updateChronogram,
  removeChronogram,
  getAllInscriptions,
  getAllInscriptionsPDF,
}
