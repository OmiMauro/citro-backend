import { executeValidation } from './validation-index.js'
import { id, image } from './common-validation.js'

const createValidation = [image, executeValidation]
const idValidation = [id, executeValidation]

export { createValidation, idValidation }
