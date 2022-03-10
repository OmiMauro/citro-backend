import Express from 'express'
import organizationControllers from '../controllers/organization.js'
const router = Express.Router()

router.post('/', organizationControllers.create)
router.get('/:id', organizationControllers.getById)
router.put('/:id', organizationControllers.update)

export default router
