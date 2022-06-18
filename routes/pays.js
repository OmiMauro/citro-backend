import express from 'express'
import { isAdmin, isAuth, isOwnUser } from '../middlewares/auth.js'
import {
  idValidation,
  updateValidation,
} from '../middlewares/pays-validation.js'
import paysControllers from '../controllers/pays.js'
const router = express.Router()

router.put('/:id', isAuth, isAdmin, updateValidation, paysControllers.update)
router.get('/:id', isAuth, isAdmin, idValidation, paysControllers.getById)
router.get(
  '/:id/user/:userId',
  isAuth,
  isOwnUser,
  idValidation,
  paysControllers.getById
)
export default router
