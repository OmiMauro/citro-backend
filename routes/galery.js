import Express from 'express'
import galeryControllers from '../controllers/galery.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
import { createValidation, idValidation } from '../middlewares/galery-validation.js'
const router = Express.Router()

router.get('/', galeryControllers.getAll)
router.post('/', isAuth, isAdmin, filesMiddleware.validateArrayImage({ required: true }), createValidation, galeryControllers.create)
router.get('/:id', isAuth, isAdmin, idValidation, galeryControllers.getById)
router.put('/:id', isAuth, isAdmin, filesMiddleware.validateSingleImage(), galeryControllers.update)
router.delete('/:id', isAuth, isAdmin, idValidation, galeryControllers.remove)

export default router
