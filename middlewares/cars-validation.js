import { executeValidation } from './validation-index.js'
import { check, param } from 'express-validator'

const id = param('id', 'Must be input id in the params.')
  .isInt()

const createValidation = [executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, executeValidation]

export { createValidation, removeValidation, updateValidation }
