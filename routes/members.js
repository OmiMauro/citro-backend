import Express from 'express'
import membersControlllers from '../controllers/members.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
import {
	createValidation,
	updateValidation,
	idValidation
} from '../middlewares/members-validation.js'
const router = Express.Router()

router.get('/', membersControlllers.getAll)
router.post(
	'/',
	isAuth,
	isAdmin,
	filesMiddleware.validateSingleImage({ required: true }),
	createValidation,
	membersControlllers.create
)
router.get('/:id', isAuth, isAdmin, membersControlllers.getById)
router.put(
	'/:id',
	isAuth,
	isAdmin,
	updateValidation,
	membersControlllers.update
)
router.patch(
	'/:id/image',
	isAuth,
	isAdmin,
	filesMiddleware.validateSingleImage({ required: true }),
	idValidation,
	membersControlllers.updateImage
)
router.delete('/:id', isAuth, isAdmin, idValidation, membersControlllers.remove)

export default router
