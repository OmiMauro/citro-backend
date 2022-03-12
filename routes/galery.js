import Express from 'express'
import galeryControllers from '../controllers/galery.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
const router = Express.Router()

router.get('/', galeryControllers.getAll)
router.post('/', isAuth, isAdmin, filesMiddleware.validateArrayImage({ required: true }), galeryControllers.create)
router.get('/:id', isAuth, isAdmin, galeryControllers.getById)
router.put('/:id', isAuth, isAdmin, filesMiddleware.validateSingleImage(), galeryControllers.update)
router.delete('/:id', isAuth, isAdmin, galeryControllers.remove)

export default router
