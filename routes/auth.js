import Express from 'express'
import authControllers from '../controllers/auth.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
const router = Express.Router()

router.get('/', isAuth, isAdmin, authControllers.getAll)
router.post('/register', filesMiddleware.validateSingleImage(), authControllers.register)
router.post('/login', authControllers.login)
router.get('/me', isAuth, authControllers.me)

export default router
