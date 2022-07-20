import { executeValidation } from './validation-index.js'
import { check, param } from 'express-validator'
import { id } from './common-validation.js'

const eventId = param('eventId', 'Ingrese el ID del evento').isMongoId()

const province = check('province')
  .exists()
  .withMessage('Ingrese la provincia de origen')
  .isString()
const locality = check('locality')
  .exists()
  .withMessage('Ingrese la localidad de origen')
  .isString()

const createValidation = [province, locality, executeValidation]
const updateValidation = [id, province, locality, executeValidation]

const getAllValidation = [eventId, executeValidation]
const idValidation = [id, executeValidation]

export { createValidation, idValidation, updateValidation, getAllValidation }
