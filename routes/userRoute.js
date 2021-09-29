import express from 'express'

import {
  requireSignin,
  isAdmin,
  isAuth
} from '../controllers/authController.js'
import { userById, read, update } from '../controllers/userController.js'

const Router = express.Router()

Router.get('/secret/:userId', requireSignin, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  })
})

Router.get('/user/:userId', requireSignin, isAuth, read)
Router.put('/user/:userId', requireSignin, isAuth, update)
Router.param('userId', userById)

export default Router
