import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../helpers/dbErrorHandlers.js'

const signup = async (req, res, next) => {
  console.log(req.body)
  try {
    const user = new User(req.body)
    const userSaved = await user.save()
    userSaved.salt = undefined
    userSaved.hashedPassword = undefined
    res.json(userSaved)
  } catch (error) {
    return res.status(400).json({ err: errorHandler(error) })
  }
}
const signin = async (req, res, next) => {
  try {

  } catch (error) {

  }
}
const signout = (req, res, next) => {

}
const requireSignin = (req, res, next) => {

}

const isAuth = async (req, res, next) => {}
const isAdmin = async (req, res, next) => {}

export { signup, signin, signout, requireSignin, isAuth, isAdmin }
