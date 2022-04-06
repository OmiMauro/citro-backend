import { executeValidation } from './validation-index.js'
// import { check, param } from 'express-validator'
import {
	id,
	name,
	lastname,
	image,
	phone,
	urlInstragram,
	urlWhatsapp,
	urlFacebook
} from './common-validation.js'

const createValidation = [
	name,
	lastname,
	image,
	phone,
	urlFacebook,
	urlInstragram,
	urlWhatsapp,
	executeValidation
]
const idValidation = [id, executeValidation]
const updateValidation = [
	id,
	name,
	lastname,
	image,
	phone,
	urlFacebook,
	urlInstragram,
	urlWhatsapp,
	executeValidation
]

export { createValidation, idValidation, updateValidation }
