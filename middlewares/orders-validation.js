import { executeValidation } from './validation-index.js'
import { id } from './common-validation.js'

const idValidation = [id, executeValidation]

export default { idValidation }
