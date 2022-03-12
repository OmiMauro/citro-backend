import Express from 'express'
import membersControlllers from '../controllers/members.js'
import filesMiddleware from '../middlewares/files.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
const router = Express.Router()

router.get('/', membersControlllers.getAll)
router.post('/', isAuth, isAdmin, filesMiddleware.validateSingleImage({ required: true }), membersControlllers.create)
router.get('/:id', isAuth, isAdmin, membersControlllers.getById)
router.put('/:id', isAuth, isAdmin, filesMiddleware.validateSingleImage(), membersControlllers.update)
router.delete('/:id', isAuth, isAdmin, membersControlllers.remove)

export default router
