import Express from 'express'
import carsControllers from '../controllers/cars.js'
const router = Express.Router()

router.get('/', carsControllers.getAll)
router.post('/', carsControllers.create)
router.get('/:id', carsControllers.getById)
router.put('/:id', carsControllers.update)
router.delete('/:id', carsControllers.remove)

export default router
