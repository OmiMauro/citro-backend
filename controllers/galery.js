import galeryServices from '../services/galery.js'

const create = async (req, res, next) => {
	try {
		const galery = await galeryServices.create(req.body, req.files)
		return res.status(201).json({ msg: 'La imagen fue creada.', data: galery })
	} catch (error) {
		res
			.status(error.status)
			.json({ errors: [{ msg: error.message }], data: false })
	}
}
const update = async (req, res, next) => {
	try {
		const galery = await galeryServices.update(req.params.id, req.body)
		res.status(201).json({ msg: 'La imagen fue actualizada', data: galery })
	} catch (error) {
		res
			.status(error.status)
			.json({ errors: [{ msg: error.message }], data: false })
	}
}
const remove = async (req, res, next) => {
	try {
		const galery = await galeryServices.remove(req.params.id)
		res.status(200).json({ msg: 'La imagen se elimino.', data: galery })
	} catch (error) {
		res
			.status(error.status)
			.json({ errors: [{ msg: error.message }], data: false })
	}
}
const getAll = async (req, res, next) => {
	try {
		const { page } = req.query
		const galeries = await galeryServices.getAll(page)
		res.status(201).json({ data: galeries })
	} catch (error) {
		res
			.status(error.status)
			.json({ errors: [{ msg: error.message }], data: false })
	}
}
const getById = async (req, res, next) => {
	try {
		const galery = await galeryServices.getById(req.params.id)
		res.status(201).json({ data: galery })
	} catch (error) {
		res
			.status(error.status)
			.json({ errors: [{ msg: error.message }], data: false })
	}
}

export default { create, update, remove, getAll, getById }
