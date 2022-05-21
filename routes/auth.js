import Express from 'express'
import authControllers from '../controllers/auth.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
import authValidations from '../middlewares/auth-validation.js'
/* import {
	registerValidation,
	loginValidation,
	resetPassValidation,
	forgotPassValidation,
	verifyTokenValidation
} from '../middlewares/auth-validation.js' */
const router = Express.Router()

router.get('/', isAuth, isAdmin, authControllers.getAll)
router.post(
	'/register',
	authValidations.registerValidation,
	authControllers.register
)
router.post('/login', authValidations.loginValidation, authControllers.login)
router.post(
	'/forgot-password',
	authValidations.forgotPassValidation,
	authControllers.forgotPassword
)
router.get(
	'/forgot-password/:token',
	authValidations.verifyTokenValidation,
	authControllers.verifyToken
)
router.post(
	'/reset-password/:token',
	authValidations.resetPassValidation,
	authControllers.resetPassword
)
router.post(
	'/confirm-account/:token',
	authValidations.verifyTokenValidation,
	authControllers.confirmAccount
)
router.get('/me', isAuth, authControllers.me)

export default router
