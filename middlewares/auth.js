import { verifyToken } from '../modules/auth.js'
import config from '../config/config.js'
import rolesRepository from '../repositories/roles.js'
import usersRepository from '../repositories/users.js'
const { adminRoleName } = config

const isAuth = async (req, res, next) => {
  try {
    const token = getTokenPayload(req)
    const user = await usersRepository.getById(token.userId)
    if (!user) {
      return res.status(403).json({ errors: [{ msg: 'Token no valido' }] })
    }
    const authUser = user.toObject()
    delete authUser['token']
    delete authUser['password']
    delete authUser['deleted']
    delete authUser['deletedAt']
    delete authUser['inscriptionId']
    req.authUser = authUser
    next()
  } catch (error) {
    return res.status(error.status).json({ errors: [{ msg: error.message }] })
  }
}
const isAdmin = async (req, res, next) => {
  try {
    const { authUser } = req
    const roleUser = await rolesRepository.getById(authUser.roleId)
    if (roleUser.name !== adminRoleName) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Recurso solo para administradores' }] })
    }
    next()
  } catch (error) {
    next(error)
  }
}
const isOwnUser = async (req, res, next) => {
  try {
    const token = getTokenPayload(req)
    const user = await usersRepository.getById(token.userId)
    if (!user) {
      const error = new Error('No se encontro un usuario ')
      error.status = 404
      throw error
    }
    if (token.userId !== req.params.id) {
      const error = new Error('No esta autorizado')
      error.status = 403
      throw error
    }
    next()
  } catch (error) {
    next(error)
  }
}

const getTokenPayload = (req) => {
  const tokenHeader = req.headers.authorization
  const token =
    tokenHeader &&
    tokenHeader.startsWith('Bearer ') &&
    tokenHeader.split(' ')[1]
  if (!token) {
    const error = new Error('Por favor, ingrese un token en el headers')
    error.status = 403
    throw error
  }
  return verifyToken(token)
}

export { isAdmin, isAuth, isOwnUser, getTokenPayload }
