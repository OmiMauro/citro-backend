import { executeValidation } from './validation-index'
import { check, param } from 'express-validator'

const name = check('name', 'Ingresar el nombre')
  .notEmpty()
  .trim()
const image = check('image', 'Ingresar la imagen o avatar')
  .notEmpty()
  .trim()
const phone = check('phone', 'Ingresar el celular')
  .notEmpty()
  .trim()
const email = check('email', 'Ingresar el email')
  .notEmpty()
  .trim()
  .isEmail()
const welcomeText = check('welcomeText', 'Ingresar un texto de bienvenida')
  .trim()
  .isString()
const aboutUs = check('aboutUs', 'Ingresar una descripcion sobre la organizacion o grupo')
  .trim()
  .isString()

const urlFacebook = check('urlfacebook', 'Ingresar la URL del Facebook')
  .trim()
const urlInstragram = check('urlinstragram', 'Ingresar la URL del Instagram')
  .trim()
const urlWhatsapp = check('urlwhatsapp', 'Ingresar la URL del Whatsapp')
  .trim()
const id = param('id', 'Ingresar el ID como parametro')
  .isMongoId()

const createValidation = [name, image, phone, email, welcomeText, aboutUs, urlFacebook, urlInstragram, urlWhatsapp, executeValidation]

const removeValidation = [id, executeValidation]
const updateValidation = [id, name, image, phone, email, welcomeText, aboutUs, urlFacebook, urlInstragram, urlWhatsapp, executeValidation]

export { createValidation, removeValidation, updateValidation }
