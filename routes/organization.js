import Express from 'express'
import organizationControllers from '../controllers/organization.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
import {
	createValidation,
	updateValidation,
	idValidation
} from '../middlewares/organizations-validation.js'
const router = Express.Router()

router.post(
	'/',
	isAuth,
	isAdmin,
	filesMiddleware.validateSingleImage({ required: true }),
	createValidation,
	organizationControllers.create
)
router.get('/:id', organizationControllers.getById)
router.put(
	'/:id',
	isAuth,
	isAdmin,
	updateValidation,
	organizationControllers.update
)
router.patch(
	'/:id/image',
	isAuth,
	isAdmin,
	idValidation,
	filesMiddleware.validateSingleImage({ required: true }),
	organizationControllers.updateImage
)

export default router
