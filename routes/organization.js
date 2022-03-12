import Express from 'express'
import organizationControllers from '../controllers/organization.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'

const router = Express.Router()

router.post('/', isAuth, isAdmin, filesMiddleware.validateSingleImage({ required: true }), organizationControllers.create)
router.get('/', organizationControllers.getById)
router.put('/:id', isAuth, isAdmin, filesMiddleware.validateSingleImage(), organizationControllers.update)

export default router
