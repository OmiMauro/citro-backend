import { executeValidation } from './validation-index.js'
import { id } from './common-validation.js'
import { param } from 'express-validator'

const inscriptionId = param('inscriptionId', 'Ingrese el ID de la inscripcion')
  .exists()
  .isMongoId()

const idValidation = [inscriptionId, executeValidation]

export { idValidation }
