import Express from 'express'
import organizationControllers from '../controllers/organization.js'
const router = Express.Router()

router.get('/', organizationControllers.getAll)
router.post('/', organizationControllers.create)
router.get('/:id', organizationControllers.getById)
router.put('/:id', organizationControllers.update)
router.delete('/:id', organizationControllers.remove)

export default router
