import organizationServices from '../services/organization.js'

const create = async (req, res, next) => {
  try {
    const organization = await organizationServices.create(req.body)
    res.status(201).json({ msg: 'El grupo fue creado exitosamente', data: organization })
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const organization = await organizationServices.update(req.params.id, req.body)
    res.status(200).json({ msg: 'La organizacion fue actualizada con exito', data: organization })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const organization = await organizationServices.getById(req.params.id)
    res.status(200).json({ data: organization })
  } catch (error) {
    next(error)
  }
}

export default { create, update, getById }
