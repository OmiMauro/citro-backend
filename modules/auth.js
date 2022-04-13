import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const createToken = (payload) => {
	return jwt.sign(payload, config.token.secret, {
		expiresIn: config.token.expiresIn
	})
}

const verifyToken = (token) => {
	try {
		return jwt.verify(token, config.token.secret)
	} catch (error) {
		error.message = 'Token Bearer invalid'
		error.status = 401
		throw error
	}
}
export { createToken, verifyToken }
