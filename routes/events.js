import Express from 'express'
import eventsController from '../controllers/events.js'
import { isAdmin, isAuth } from '../middlewares/auth.js'
import filesMiddleware from '../middlewares/files.js'
import {
  idValidation,
  createValidation,
  updateValidation,
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
router.put('/:id', isAuth, isAdmin, updateValidation, eventsController.update)

router.patch(
  '/:id/image',
  isAuth,
  isAdmin,
  idValidation,
  filesMiddleware.validateSingleImage({ required: true }),
  eventsController.updateImage
)
router.delete('/:id', idValidation, isAuth, isAdmin, eventsController.remove)

router.post(
  '/:id/chronogram',
  isAuth,
  isAdmin,
  /* createChronogramValidation, */
  eventsController.createChronogram
)
router.put(
  '/:id/chronogram/:chronogramId',
  isAuth,
  isAdmin,
  idValidation,
  eventsController.updateChronogram
)
router.delete(
  '/:id/chronogram/:chronogramId',
  isAuth,
  isAdmin,
  idValidation,
  eventsController.removeChronogram
)
router.get(
  '/:id/inscriptions',
  isAuth,
  isAdmin,
  idValidation,
  eventsController.getAllInscriptions
)

export default router
