import { executeValidation } from './validation-index'
import { check, param } from 'express-validator'

const id = param('id', 'Ingresar el id de la imagen')
  .exists()
  .isMongoId()

const createValidation = [executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, executeValidation]

export { createValidation, removeValidation, updateValidation }
