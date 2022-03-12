import Express from 'express'
import slidesControllers from '../controllers/slides.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
const router = Express.Router()

router.get('/', slidesControllers.getAll)
router.post('/', isAuth, isAdmin, filesMiddleware.validateSingleImage({ required: true }), slidesControllers.create)
router.get('/:id', isAuth, isAdmin, slidesControllers.getById)
router.put('/:id', isAuth, isAdmin, filesMiddleware.validateSingleImage(), slidesControllers.update)
router.delete('/:id', isAuth, isAdmin, slidesControllers.remove)

export default router
