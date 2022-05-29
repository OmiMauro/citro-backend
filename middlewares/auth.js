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
		user.password = ''
		req.authUser = user
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
		console.log(user)
		console.log(token)
		if (user._id === req.params.id) return next()

		const error = new Error('No esta autorizado')
		error.status = 403
		throw error
	} catch (error) {
		console.log(error)
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
		return res.status(403).json({
			errors: [{ msg: 'Por favor, ingrese un token en el headers' }]
		})
	}
	return verifyToken(token)
}

export { isAdmin, isAuth, isOwnUser, getTokenPayload }
