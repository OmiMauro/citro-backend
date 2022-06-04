import Express from 'express'
import carsControllers from '../controllers/cars.js'
import { isAuth, isAdmin, isOwnUser } from '../middlewares/auth.js'
const router = Express.Router()

router.get('/', isAuth, isAdmin, carsControllers.getAll)
router.post('/', isAuth, isOwnUser, carsControllers.create)
router.get('/:id', isAuth, isOwnUser, carsControllers.getById)
router.put('/:id', isAuth, isOwnUser, carsControllers.update)
router.delete('/:id', isAuth, isOwnUser, carsControllers.remove)

export default router
