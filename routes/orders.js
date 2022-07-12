import express from 'express'
import { isAdmin, isAuth } from '../middlewares/auth.js'
import ordersControllers from '../controllers/orders.js'
import { idValidation } from '../middlewares/orders-validation.js'
const router = express.Router()

router.post(
  '/create-preference/:inscriptionId',
  isAuth,
  idValidation,
  ordersControllers.create
)
router.post('/webhook', ordersControllers.webhook)
router.get('/:id', isAuth, idValidation, ordersControllers.getById)
export default router
