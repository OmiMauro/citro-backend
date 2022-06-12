import inscriptionsService from '../services/inscriptions.js'

const create = async (req, res) => {
  try {
    const inscription = await inscriptionsService.create(
      req.authUser._id,
      req.params.eventId,
      req.body
    )
    return res
      .status(201)
      .json({ msg: 'Se agrego exitosamente la inscripción', data: inscription })
  } catch (error) {
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const update = async (req, res) => {
  try {
    const inscription = await inscriptionsService.update(
      req.params.id,
      req.body
    )
    res.status(201).json({
      msg: 'Se actualizo exitosamente la inscripción',
      data: inscription,
    })
  } catch (error) {
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}

const getAll = async (req, res) => {
  try {
    const inscriptions = await inscriptionsService.getAll(req.params.eventId)
    res.status(201).json({ data: inscriptions })
  } catch (error) {
    console.log(error)
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}

const getById = async (req, res) => {
  try {
    const inscription = await inscriptionsService.getById(req.params.id)
    res.status(201).json({ data: inscription })
  } catch (error) {
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}

export default { create, update, getAll, getById }
