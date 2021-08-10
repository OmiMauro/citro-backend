import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import { errorHandler } from '../helpers/dbErrorHandlers.js'

const signup = async (req, res) => {
  try {
    const user = new User(req.body)
    const userSaved = await user.save()
    if (userSaved) {
      userSaved.salt = undefined
      userSaved.hashedPassword = undefined
      res.json(userSaved)
    }
  } catch (error) {
    return res.status(400).json({ err: errorHandler(error) })
  }
}
const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user.authenticate(password)) {
      // Generar el token firmado con el id y el secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
      // persistir el token como 't como cookie con fecha de expiracion
      res.cookie('t', token, { expire: new Date() + 9999 })
      const { _id, name, email, role } = user
      return res.json({ token, user: { _id, email, name, role } })
    } else {
      res.status(401).json({ error: 'Email o contraseña incorrectas. ' })
    }
  } catch (error) {
    return res.status(400).json({ error: 'El usuario con el email ingresado no existe. Por favor, contactese con el administrador!' })
  }
}
const signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Ha cerrado su sesion.' })
}
const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'cookieauth'
})

const isAuth = (req, res, next) => {
  console.log(req.profile, req.auth)
  const user = req.profile && req.auth && req.profile._id == req.auth._id
  if (!user) {
    return res.status(403).json({ error: 'Acceso denegado' })
  }
  next()
}
const isAdmin = async (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: 'Recursos solo para administradores.' })
  }
  next()
}

export { signup, signin, signout, requireSignin, isAuth, isAdmin }
