import organizationServices from '../services/organization.js'

const create = async (req, res, next) => {
  try {
    const organization = await organizationServices.create(req.body)
    res.status(201).json({ msg: 'El grupo fue creado exitosamente', data: organization })
  } catch (e) {
    next(e)
  }
}
const update = async (req, res) => {}
const remove = async (req, res) => {}
const getAll = async (req, res) => {}
const getById = async (req, res) => {}

const organizationControllers = { create, update, remove, getAll, getById }

export default organizationControllers
