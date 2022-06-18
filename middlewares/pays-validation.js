import { id } from './common-validation.js'
import { executeValidation } from './validation-index.js'
import { check } from 'express-validator'
const amount = check('amount', 'Ingrese la el monto que pago')
  .isNumeric()
  .exists()
const isPay = check('isPay', 'Ingrese el estado del pago').exists().isBoolean()
const updateValidation = [id, amount, isPay, executeValidation]
const idValidation = [id, executeValidation]
export { updateValidation, idValidation }
