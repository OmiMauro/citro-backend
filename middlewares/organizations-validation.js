import { executeValidation } from './validation-index.js'
import { check } from 'express-validator'
import { id, name, image, phone, email, urlFacebook, urlInstragram, urlWhatsapp } from './common-validation.js'

const welcomeText = check('welcomeText')
  .optional()
  .isString().withMessage('Debe ingresar un texto de bienvenida')

const aboutUs = check('aboutUs')
  .optional()
  .isString().withMessage('Debe ingresar un texto de bienvenida')

const createValidation = [name, image, phone, email, welcomeText, aboutUs, urlFacebook, urlInstragram, urlWhatsapp, executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, name, image, phone, email, welcomeText, aboutUs, urlFacebook, urlInstragram, urlWhatsapp, executeValidation]

export { createValidation, removeValidation, updateValidation }
