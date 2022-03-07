import Express from 'express'
import slidesControllers from '../controllers/slides.js'
const router = Express.Router()

router.get('/', slidesControllers.getAll)
router.post('/', slidesControllers.create)
router.get('/:id', slidesControllers.getById)
router.put('/:id', slidesControllers.update)
router.delete('/:id', slidesControllers.remove)

export default router
