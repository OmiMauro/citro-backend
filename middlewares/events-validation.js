import { executeValidation } from './validation-index.js'
import { check, param } from 'express-validator'
import { id, name } from './common-validation.js'

const price = check('price', 'Ingrese el costo de la inscripcion').isNumeric()
const description = check('description', 'Ingrese una descripcion del evento')
	.exists()
	.notEmpty()

const createValidation = [name, price, description, executeValidation]
const idValidation = [id, executeValidation]
const updateValidation = [id, name, price, description, executeValidation]

export { createValidation, idValidation, updateValidation }
