import Express from 'express'
import authControllers from '../controllers/auth.js'
const router = Express.Router()

router.get('/', authControllers.getAll)
router.post('/register', authControllers.register)
router.post('/login', authControllers.login)
router.get('/me', authControllers.me)

export default router
