import { executeValidation } from './validation-index.js'
import { check, param } from 'express-validator'
import { name, lastname, image, id, email, phone } from './common-validation.js'

const password = check('password')
  .exists().withMessage('Contraseña requerdia').bail()
  .isString().withMessage('Ingrese una cadena de caracteres').bail()
  .notEmpty().withMessage('No puede ser vacio').bail()

const registerValidation = [name, lastname, email, password, image, phone, executeValidation]
const loginValidation = [email, password, executeValidation]
const updateValidation = [id, executeValidation]

export { registerValidation, loginValidation, updateValidation }
