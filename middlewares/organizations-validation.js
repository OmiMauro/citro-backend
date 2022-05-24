import { executeValidation } from './validation-index.js'
import { check } from 'express-validator'
import {
	id_number,
	name,
	image,
	phone,
	email,
	urlFacebook,
	urlInstragram,
	urlWhatsapp
} from './common-validation.js'

const welcomeText = check('welcomeText')
	.optional()
	.isString()
	.withMessage('Debe ingresar un texto de bienvenida')

const aboutUs = check('aboutUs')
	.optional()
	.isString()
	.withMessage('Debe ingresar un texto de bienvenida')

const createValidation = [
	name,
	image,
	phone,
	email,
	welcomeText,
	aboutUs,
	urlFacebook,
	urlInstragram,
	urlWhatsapp,
	executeValidation
]
const idValidation = [id_number, executeValidation]
const updateValidation = [
	id_number,
	name,
	phone,
	email,
	welcomeText,
	aboutUs,
	urlFacebook,
	urlInstragram,
	urlWhatsapp,
	executeValidation
]

export { createValidation, idValidation, updateValidation }
