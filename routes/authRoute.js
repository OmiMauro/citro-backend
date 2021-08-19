import express from 'express'
import { signup, signin, signout, requireSignin } from '../controllers/authController.js'
import { userSignupValidator } from '../validator/index.js'

const Router = express.Router()

Router.post('/signup', userSignupValidator, signup)
Router.post('/signin', signin)
Router.get('/signout', signout)

export default Router
