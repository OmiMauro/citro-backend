import authServices from '../services/auth.js'

const register = async (req, res, next) => {
	try {
		const user = await authServices.register(req.body, req.file)
		res.status(201).json({ msg: 'El usuario se creó con exito', data: user })
	} catch (error) {
		next(error)
	}
}
const login = async (req, res, next) => {
	try {
		const token = await authServices.login(req.body)
		res
			.status(200)
			.json({ msg: 'Se inicio sesion con exito', data: { ok: true, token } })
	} catch (error) {
		res.status(error.status).json({
			errors: [error.message],
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
