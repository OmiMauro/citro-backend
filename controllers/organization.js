import organizationServices from '../services/organization.js'

const create = async (req, res, next) => {
  try {
    const organization = await organizationServices.create(req.body, req.file)
    res
      .status(201)
      .json({ msg: 'El grupo fue creado exitosamente', data: organization })
  } catch (error) {
    res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}
const update = async (req, res, next) => {
  try {
    const organization = await organizationServices.update(
      req.params.id,
      req.body
    )
    res.status(200).json({
      msg: 'La organizacion fue actualizada con exito',
      data: organization,
    })
  } catch (error) {
    res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}
const updateImage = async (req, res, next) => {
  try {
    const organization = await organizationServices.updateImage(
      req.params.id,
      req.file
    )
    return res.status(201).json({
      msg: 'La imagen fue actualizada con éxito',
      data: organization,
    })
  } catch (error) {
    res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}

const getById = async (req, res, next) => {
  try {
    const organization = await organizationServices.getById(req.params.id)
    res.status(200).json({ data: organization })
  } catch (error) {
    res.status(error.status).json({
      errors: [{ msg: error.message }],
      data: false,
    })
  }
}

export default { create, update, getById, updateImage }
