import { verifyToken } from '../modules/auth'
import config from '../config/config.js'
import rolesRepository from '../repositories/roles.js'
import usersRepository from '../repositories/users.js'
const { adminRoleName } = config

const isAuth = async (req, res, next) => {
  try {
    const token = getTokenPayload(req)
    const user = await usersRepository.getById(token.userId)
    if (!user) {
      const error = new Error('Token no valido')
      error.status = 403
      throw error
    }
    req.authUser = user
    next()
  } catch (error) {
    next(error)
  }
}
const isAdmin = async (req, res, next) => {
  try {
    const { authUser } = req
    const roleUser = await rolesRepository.getById(authUser.roleId)
    if (roleUser.name !== adminRoleName) {
      const error = new Error('Recurso solo para administradores')
      error.status = 403
      throw error
    }
    next()
  } catch (error) {
    next(error)
  }
}
const isOwnUser = () => { }

const getTokenPayload = (req) => {
  const tokenHeader = req.headers.authorization
  const token = tokenHeader && tokenHeader.startsWith('Bearer ') && tokenHeader.split(' ')[1]
  if (!token) {
    const error = new Error('Por favor, ingrese un token en el headers')
    error.status = 403
    throw error
  }
  return verifyToken(token)
}

export { isAdmin, isAuth, isOwnUser, getTokenPayload }
