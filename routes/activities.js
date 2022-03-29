import Express from 'express'
import activitiesControllers from '../controllers/activities.js'
const router = Express.Router()

router.get('/', activitiesControllers.getAll)
router.post('/', activitiesControllers.create)
router.get('/:id', activitiesControllers.getById)
router.put('/:id', activitiesControllers.update)
router.delete('/:id', activitiesControllers.remove)

export default router
