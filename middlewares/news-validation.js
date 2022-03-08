import { executeValidation } from './validation-index'
import { check, param } from 'express-validator'

const id = param('id', 'Must be input id in the params.')
  .isMongoId()

const createValidation = [executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, executeValidation]

export { createValidation, removeValidation, updateValidation }
