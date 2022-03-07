import Express from 'express'
import galeryControllers from '../controllers/galery.js'
const router = Express.Router()

router.get('/', galeryControllers.getAll)
router.post('/', galeryControllers.create)
router.get('/:id', galeryControllers.getById)
router.put('/:id', galeryControllers.update)
router.delete('/:id', galeryControllers.remove)

export default router
