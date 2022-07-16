import Express from 'express'
import inscriptionsControllers from '../controllers/inscriptions.js'
import { isAuth, isAdmin } from '../middlewares/auth.js'
import {
  createValidation,
  getAllValidation,
  updateValidation,
  idValidation,
} from '../middlewares/inscriptions-validation.js'
const router = Express.Router()

router.get('/', isAuth, inscriptionsControllers.getAll)
router.post(
  '/:eventId',
  isAuth,
  createValidation,
  inscriptionsControllers.create
)
router.get('/:id', isAuth, idValidation, inscriptionsControllers.getById)
router.put(
  '/:id',
  isAuth,
  isAdmin,
  updateValidation,
  inscriptionsControllers.update
)

export default router
