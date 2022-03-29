import membersService from '../services/members.js'

const create = async (req, res, next) => {
  try {
    const member = await membersService.create(req.body, req.file)
    res.status(201).json({ msg: 'El organizador fue creado.', data: member })
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const member = await membersService.update(req.params.id, req.body)
    res.status(201).json({ msg: 'El organizador fue actualizado.', data: member })
  } catch (error) {
    next(error)
  }
}
const remove = async (req, res, next) => {
  try {
    const member = await membersService.remove(req.params.id)
    res.status(200).json({ msg: 'El organizador fue eliminado.' })
  } catch (error) {
    next(error)
  }
}
const getAll = async (req, res, next) => {
  try {
    const members = await membersService.getAll()
    res.status(200).json({ data: members })
  } catch (error) {
    next(error)
  }
}
const getById = async (req, res, next) => {
  try {
    const member = await membersService.getById(req.params.id)
    res.status(200).json({ data: member })
  } catch (error) {
    next(error)
  }
}
export default { create, update, remove, getAll, getById }
