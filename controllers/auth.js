import { resolvedSyncPromise } from '@sentry/utils'
import authServices from '../services/auth.js'

const register = async (req, res, next) => {
	try {
		const user = await authServices.register(req.body)
		res.status(201).json({ msg: 'El usuario se creó con exito', data: user })
	} catch (error) {
		res
			.status(error.status)
			.json({ errors: [{ msg: error.message }], data: { ok: false } })
	}
}
const login = async (req, res, next) => {
	try {
		const { token, user } = await authServices.login(req.body)
		return res.status(200).json({
			msg: 'Se inicio sesion con exito',
			data: { ok: true, token, user }
		})
	} catch (error) {
		return res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: { ok: false }
		})
	}
}
const me = async (req, res, next) => {}
const getAll = async (req, res, next) => {
	try {
		const users = await authServices.getAll()
		res.status(200).json({ data: users })
	} catch (error) {
		next(error)
	}
}
export default { register, login, me, getAll }
