import { executeValidation } from './validation-index.js'
import { check, param } from 'express-validator'
import { id } from './common-validation.js'

const eventId = param('eventId', 'Ingrese el ID del evento').isMongoId()

const provinceOrigin = check('provinceOrigin')
  .exists()
  .withMessage('Ingrese la provincia de origen')
  .isString()
const locationOrigin = check('locationOrigin')
  .exists()
  .withMessage('Ingrese la localidad de origen')
  .isString()

const createValidation = [provinceOrigin, locationOrigin, executeValidation]
const updateValidation = [id, provinceOrigin, locationOrigin, executeValidation]

const getAllValidation = [eventId, executeValidation]
const idValidation = [id, executeValidation]

export { createValidation, idValidation, updateValidation, getAllValidation }
