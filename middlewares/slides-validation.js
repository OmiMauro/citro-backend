import { executeValidation } from './validation-index'
import { check } from 'express-validator'
import { id, image } from './common-validation.js'

const order = check('order')
  .exists().withMessage('Debe ingresar el orden del slide')
  .isInt()

const createValidation = [image, order, executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, image, order, executeValidation]

export { createValidation, removeValidation, updateValidation }
