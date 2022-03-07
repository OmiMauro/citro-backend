import Express from 'express'
import usersController from '../controllers/users'

const router = Express.Router()

router.get('/', usersController.getAll)
router.post('/', usersController.create)
router.get('/:id', usersController.getById)
router.put('/:id', usersController.update)
router.delete('/:id', usersController.remove)

export default router
