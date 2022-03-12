import Express from 'express'
import slidesControllers from '../controllers/slides.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
import { createValidation, idValidation, updateValidation } from '../middlewares/slides-validation.js'
const router = Express.Router()

router.get('/', slidesControllers.getAll)
router.post('/', isAuth, isAdmin, filesMiddleware.validateSingleImage({ required: true }), createValidation, slidesControllers.create)
router.get('/:id', isAuth, isAdmin, idValidation, slidesControllers.getById)
router.put('/:id', isAuth, isAdmin, filesMiddleware.validateSingleImage(), updateValidation, slidesControllers.update)
router.delete('/:id', isAuth, isAdmin, idValidation, slidesControllers.remove)

export default router
