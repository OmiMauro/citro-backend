import Express from 'express'
import inscriptionsControllers from '../controllers/inscriptions.js'
const router = Express.Router()

router.get('/', inscriptionsControllers.getAll)
router.post('/', inscriptionsControllers.create)
router.get('/:id', inscriptionsControllers.getById)
router.put('/:id', inscriptionsControllers.update)
router.delete('/:id', inscriptionsControllers.remove)

export default router
