import User from '../models/user.js'
import { errorHandler } from '../helpers/dbErrorHandlers.js'

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' })
    }
    req.profile = user
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}
const read = (req, res) => {
  req.profile.hashedPassword = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true })
    user.hashedPassword = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({ error: 'No tienes los permisos para realizar esta accion.' })
  }
}
export { read, update, userById }
