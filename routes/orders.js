import express from 'express'
import { isAdmin, isAuth } from '../middlewares/auth.js'
import ordersControllers from '../controllers/orders.js'
const router = express.Router()

router.post(
  '/create-preference',
  isAuth,
  isAdmin,
  ordersControllers.createPreference
)
router.post('/webhook', ordersControllers.webhook)
export default router
