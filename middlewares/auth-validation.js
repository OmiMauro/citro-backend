import { executeValidation } from './validation-index'
import { check, param } from 'express-validator'
import { name, lastname, image, id, email } from './common-validation'

const password = check('password')
  .exists().withMessage('Contraseña requerdia').bail()
  .isString().withMessage('Ingrese una cadena de caracteres').bail()
  .notEmpty().withMessage('No puede ser vacio').bail()

const phone = check('phone')
  .optional().isMobilePhone()
  .withMessage('Ingrese un numero de celular valido')

const registerValidation = [name, lastname, email, password, image, phone, executeValidation]
const loginValidation = [email, password, executeValidation]
const updateValidation = [id, executeValidation]

export { registerValidation, loginValidation, updateValidation }
