import { check, param } from 'express-validator'

const id = param('id', 'Ingresar el id').exists().isMongoId()

const name = check('name')
	.exists()
	.withMessage('El nombre es requerido')
	.bail()
	.isString()
	.withMessage('Tiene que ser caracteres')
	.bail()
	.isLength({ min: 1, max: 100 })
	.withMessage('Debe tener entre 1 y 100 caracteres')
	.bail()

const lastname = check('lastname')
	.exists()
	.withMessage('El apellido es requerido')
	.bail()
	.isString()
	.withMessage('Tiene que ser caracteres')
	.bail()
	.isLength({ min: 1, max: 100 })
	.withMessage('Debe tener entre 1 y 100 caracteres')
	.bail()

const image = check('image')
	.if((value, { req }) => !req.file)
	.isString()
	.withMessage('Debe ser una URL')
	.bail()
	.isLength({ min: 1, max: 1234 })
	.withMessage('Longitud entre: 1-1234')
	.bail()

const email = check('email')
	.exists()
	.withMessage('Debe ingresar el email')
	.bail()
	.isEmail()
	.withMessage('Debe ingresar un email valido')
	.bail()
	.normalizeEmail()

const phone = check('phone')
	.isString()
	.withMessage('Ingrese un numero de celular valido')

const urlFacebook = check('urlfacebook')
	.optional()
	.isString()
	.withMessage('Debe ingresar caracteres')
	.isURL()
	.withMessage('Debe ingresar una URL')

const urlInstragram = check('urlInstragram')
	.optional()
	.isString()
	.withMessage('Debe ingresar caracteres')
	.isURL()
	.withMessage('Debe ingresar una URL')

const urlWhatsapp = check('urlWhatsapp')
	.optional()
	.isString()
	.withMessage('Debe ingresar caracteres')
	.isURL()
	.withMessage('Debe ingresar una URL')

export {
	name,
	lastname,
	id,
	image,
	email,
	phone,
	urlFacebook,
	urlInstragram,
	urlWhatsapp
}
