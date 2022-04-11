import galeryServices from '../services/galery.js'

const create = async (req, res, next) => {
	try {
		const galery = await galeryServices.create(req.body, req.files)
		return res.status(201).json({ msg: 'La imagen fue creada.', data: galery })
	} catch (error) {
		next(error)
	}
}
const update = async (req, res, next) => {
	try {
		const galery = await galeryServices.update(req.params.id, req.body)
		res.status(201).json({ msg: 'La imagen fue actualizada', data: galery })
	} catch (error) {
		next(error)
	}
}
const remove = async (req, res, next) => {
	try {
		const galery = await galeryServices.remove(req.body)
		res.status(200).json({ msg: 'La imagen se elimino.', data: galery })
	} catch (error) {
		next(error)
	}
}
const getAll = async (req, res, next) => {
	try {
		const galeries = await galeryServices.getAll()
		res.status(201).json({ data: galeries })
	} catch (error) {
		next(error)
	}
}
const getById = async (req, res, next) => {
	try {
		const galery = await galeryServices.getById(req.params.id)
		res.status(201).json({ data: galery })
	} catch (error) {
		next(error)
	}
}

export default { create, update, remove, getAll, getById }
