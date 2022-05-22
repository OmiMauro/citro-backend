import { resolvedSyncPromise } from '@sentry/utils'
import config from '../config/config.js'
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
		return res.status(200).json({ data: users })
	} catch (error) {
		return res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: { ok: false }
		})
	}
}
const forgotPassword = async (req, res, next) => {
	try {
		const response = await authServices.forgotPassword(req.body)
		return res.status(200).json({
			msg: 'Hemos enviado un email con las instrucciones. Por favor, verifique su casilla de email. ',
			data: { ok: true }
		})
	} catch (error) {
		return res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: { ok: false }
		})
	}
}

const verifyToken = async (req, res, next) => {
	try {
		const response = await authServices.isValidToken(req.params.token)
		return res.status(200).json({
			msg: 'Token valido',
			data: { ok: true }
		})
	} catch (error) {
		return res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: { ok: false }
		})
	}
}
const resetPassword = async (req, res, next) => {
	try {
		const response = await authServices.resetPassword(
			req.params.token,
			req.body
		)
		return res.status(200).json({
			msg: 'Su contraseña fue reestablecida con éxito.',
			data: { ok: true }
		})
	} catch (error) {
		return res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: { ok: false }
		})
	}
}
const confirmAccount = async (req, res, next) => {
	try {
		const response = await authServices.confirmEmail(req.params.token)
		return res
			.status(200)
			.json({ msg: 'Su cuenta fue verificada con éxito', data: { ok: true } })
	} catch (error) {
		return res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: { ok: false }
		})
	}
}
export default {
	register,
	login,
	me,
	getAll,
	forgotPassword,
	resetPassword,
	verifyToken,
	confirmAccount
}
