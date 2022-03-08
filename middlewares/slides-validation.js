import { executeValidation } from './validation-index'
import { check, param } from 'express-validator'

const id = param('id', 'Ingresar el id')
  .exists()
  .isMongoId()
const image = check('image', 'Ingresar una imagen')
  .notEmpty()
  .trim()
const order = check('order', 'Ingresar la ubicacion de la imagen')
  .isInt()

const createValidation = [image, order, executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, image, order, executeValidation]

export { createValidation, removeValidation, updateValidation }
