import Express from 'express'
import usersController from '../controllers/users.js'
import authValidation from '../middlewares/auth-validation.js'

const router = Express.Router()

router.put('/:id', authValidation.updateValidation, usersController.update)
router.delete('/:id', authValidation.idValidation, usersController.remove)

export default router
