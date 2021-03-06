import { executeValidation } from './validation-index.js'
import { check } from 'express-validator'
import { id, image } from './common-validation.js'

const order = check('order')
	.exists()
	.withMessage('Debe ingresar el orden del slide')
	.isInt()

const createValidation = [image, order, executeValidation]
const idValidation = [id, executeValidation]
const updateValidation = [id, order, executeValidation]

export { createValidation, idValidation, updateValidation }
