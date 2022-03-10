import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const { token } = config
const createToken = payload => {
  return jwt.sign(payload, token.secret, { expiresIn: token.expiresIn })
}

const verifyToken = token => {
  try {
    return jwt.verify(token, token.secret)
  } catch (error) {
    error.message = 'Token Bearer invalid'
    error.status = 401
    throw error
  }
}
export { createToken, verifyToken }
