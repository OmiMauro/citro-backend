import usersServices from '../services/users.js'

const update = async (req, res, next) => {
	try {
		const user = await usersServices.update(req.params.id, req.body)
		res
			.status(201)
			.json({ msg: 'El usuario fue actualizado con exito', data: user })
	} catch (error) {
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}
const remove = async (req, res, next) => {
	try {
		const user = await usersServices.remove(req.params.id)
		res.status(200).json({ msg: 'El usuario fue eliminado con exito' })
	} catch (error) {
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}
const getById = async (req, res, next) => {
	try {
		const user = await usersServices.getById(req.params.id)
		user.password = null
		res.status(200).json({ data: user })
	} catch (error) {
		console.log(error)
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}

export default { update, remove, getById }
