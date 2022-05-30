import Express from 'express'
import eventsController from '../controllers/events.js'
import { isAdmin, isAuth } from '../middlewares/auth.js'
import filesMiddleware from '../middlewares/files.js'
import {
	idValidation,
	createValidation,
	updateValidation
} from '../middlewares/events-validation.js'
const router = Express.Router()

router.get('/', eventsController.getAll)
router.post(
	'/',
	filesMiddleware.validateSingleImage({ required: true }),
	createValidation,
	isAuth,
	isAdmin,
	eventsController.create
)
router.get('/:id', idValidation, eventsController.getById)
router.put('/:id', updateValidation, isAuth, isAdmin, eventsController.update)

router.patch(
	'/:id/image',
	isAuth,
	isAdmin,
	idValidation,
	filesMiddleware.validateSingleImage({ required: true }),
	eventsController.updateImage
)
router.delete('/:id', idValidation, isAuth, isAdmin, eventsController.remove)

export default router
