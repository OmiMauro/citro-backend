import slidesServices from '../services/slides.js'

const create = async (req, res, next) => {
	try {
		const slide = await slidesServices.create(req.body, req.file)
		res.status(201).json({ msg: 'El slide fue creado.', data: slide })
	} catch (error) {
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}
const update = async (req, res, next) => {
	try {
		const slide = await slidesServices.update(req.params.id, req.body)
		res.status(201).json({ msg: 'El slide fue actualizado.', data: slide })
	} catch (error) {
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}
const remove = async (req, res, next) => {
	try {
		const slide = await slidesServices.remove(req.params.id)
		res.status(200).json({ msg: 'El slide fue eliminado.' })
	} catch (error) {
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}
const getAll = async (req, res, next) => {
	try {
		const slides = await slidesServices.getAll()
		res.status(200).json({ data: slides })
	} catch (error) {
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}
const getById = async (req, res, next) => {
	try {
		const slide = await slidesServices.getById(req.params.id)
		res.status(200).json({ data: slide })
	} catch (error) {
		res.status(error.status).json({
			errors: [{ msg: error.message }],
			data: false
		})
	}
}

export default { create, update, remove, getAll, getById }
