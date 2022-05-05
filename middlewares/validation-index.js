import { validationResult } from 'express-validator'
import filesModule from '../modules/files.js'
const executeValidation = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		if (req.file) await filesModule.deleteLocalFile(req.file)
		return res.status(400).json({ errors: errors.array() })
	}
	next()
}

export { executeValidation }
