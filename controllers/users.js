import usersServices from '../services/users.js'

const update = async (req, res, next) => {
  try {
    const user = await usersServices.update(req.params.id, req.body)
    res.status(201).json({ msg: 'El usuario fue actualizado con exito', data: user })
  } catch (error) {
    next(error)
  }
}
const remove = async (req, res, next) => {
  try {
    const user = await usersServices.remove(req.params.id)
    res.status(200).json({ msg: 'El usuario fue eliminado con exito' })
  } catch (error) {
    next(error)
  }
}

export default { update, remove }
