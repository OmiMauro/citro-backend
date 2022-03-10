import Express from 'express'
import usersController from '../controllers/users.js'

const router = Express.Router()

router.put('/:id', usersController.update)
router.delete('/:id', usersController.remove)

export default router
