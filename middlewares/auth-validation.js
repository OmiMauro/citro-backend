import { executeValidation } from './validation-index.js'
import { check, param } from 'express-validator'
import { name, lastname, image, id, email, phone } from './common-validation.js'

const password = check('password')
  .exists()
  .withMessage('Contraseña requerdia')
  .isString()
  .withMessage('Ingrese una cadena de caracteres')
  .notEmpty()
  .withMessage('No puede ser vacio')
const dateBirth = check('dateBirth')
  .exists()
  .isDate()
  .withMessage('Ingrese su fecha de nacimiento')
const DNI = check('DNI', 'Ingrese su DNI').notEmpty().isInt()
const token = param('token')
  .exists()
  .notEmpty()
  .isString()
  .withMessage('El token es requerido')
const registerValidation = [
  name,
  lastname,
  email,
  password,
  phone,
  executeValidation,
]
const loginValidation = [email, password, executeValidation]
const forgotPassValidation = [email, executeValidation]
const resetPassValidation = [token, password, executeValidation]
const verifyTokenValidation = [token, executeValidation]
const updateValidation = [
  id,
  name,
  lastname,
  phone,
  DNI,
  dateBirth,
  executeValidation,
]
const idValidation = [id, executeValidation]

export default {
  registerValidation,
  loginValidation,
  updateValidation,
  idValidation,
  forgotPassValidation,
  resetPassValidation,
  verifyTokenValidation,
}
