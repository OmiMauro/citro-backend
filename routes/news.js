import Express from 'express'
import newsControllers from '../controllers/news.js'
const router = Express.Router()

router.get('/', newsControllers.getAll)
router.post('/', newsControllers.create)
router.get('/:id', newsControllers.getById)
router.put('/:id', newsControllers.update)
router.delete('/:id', newsControllers.remove)

export default router
