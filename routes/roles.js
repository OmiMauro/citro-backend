import Express from 'express'
import rolesController from '../controllers/roles.js'

const router = Express.Router()
router.get('/', rolesController.getAll)
router.post('/', rolesController.create)
router.get('/:id', rolesController.getById)
router.put('/:id', rolesController.update)
router.delete('/:id', rolesController.remove)

export default router
