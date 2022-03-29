import Express from 'express'
import usersController from '../controllers/users.js'
import { updateValidation, idValidation } from '../middlewares/auth-validation.js'

const router = Express.Router()

router.put('/:id', updateValidation, usersController.update)
router.delete('/:id', idValidation, usersController.remove)

export default router
