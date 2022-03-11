import { executeValidation } from './validation-index.js'
import { check } from 'express-validator'
import { id, name, lastname, email, password, image } from './common-validation.js'

const newPassword = check('newPassword')
  .optional()
  .isString().withMessage('Debe ingresar una contraseña')
const createValidation = [executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, name, lastname, email, password, newPassword, image, executeValidation]

export { createValidation, removeValidation, updateValidation }
