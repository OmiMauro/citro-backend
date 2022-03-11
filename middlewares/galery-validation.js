import { executeValidation } from './validation-index'
import { check, param } from 'express-validator'
import { id, image } from './common-validation.js'

const createValidation = [image, executeValidation]
const removeValidation = [id, executeValidation]
const updateValidation = [id, image, executeValidation]

export { createValidation, removeValidation, updateValidation }
