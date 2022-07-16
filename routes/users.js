import Express from 'express'
import usersController from '../controllers/users.js'
import authValidation from '../middlewares/auth-validation.js'
import { isOwnUser, isAdmin, isAuth } from '../middlewares/auth.js'

const router = Express.Router()
router.get(
  '/:id',
  isAuth,
  isOwnUser,
  authValidation.idValidation,
  usersController.getById
)
router.put(
  '/:id',
  isAuth,
  isOwnUser,
  authValidation.updateValidation,
  usersController.update
)
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  isOwnUser,
  authValidation.idValidation,
  usersController.remove
)
router.patch(
  '/:id',
  isAuth,
  isOwnUser,
  authValidation.updatePasswordValidation,
  usersController.updatePassword
)
export default router
