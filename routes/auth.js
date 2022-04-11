import Express from 'express'
import authControllers from '../controllers/auth.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
import {
	registerValidation,
	loginValidation
} from '../middlewares/auth-validation.js'
const router = Express.Router()

router.get('/', isAuth, isAdmin, authControllers.getAll)
router.post('/register', registerValidation, authControllers.register)
router.post('/login', loginValidation, authControllers.login)
router.get('/me', isAuth, authControllers.me)

export default router
