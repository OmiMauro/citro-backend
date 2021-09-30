const userSignupValidator = (req, res, next) => {
  req.check('name', 'El nombre es obligatorio').notEmpty()
  req
    .check('email', 'El email debe tener entre 3 y 32 caracteres. ')
    .matches(/.+\@.+\..+/)
    .withMessage('El email debe contener @')
    .isLength({
      min: 4,
      max: 32
    })
  req.check('password', 'La contraseña es obligatoria').notEmpty()
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debería contener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un numero')

  const errors = req.validationErrors()

  if (errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}
const inscriptionValidator = (req, res, next) => {
  req.check('name', 'El nombre es obligatorio').notEmpty()
  req.check('lastname', 'El apellido es obligatorio').notEmpty()
  req.check('DNI', 'El DNI es obligatorio').notEmpty()
  req.check('dateBirth', 'La Fecha de Nacimiento es obligatorio').notEmpty()

  req
    .check('email', 'El email deberia ser entre 4 y 32 caracteres')
    .matches(/.+\@.+\..+/)
    .withMessage('El email debe contener @')
    .isLength({
      min: 4,
      max: 32
    })
  req.check('numberCell', 'El número de celular es obligatorio').notEmpty()
  req.check('nameCar', 'Debe ingresar el nombre del auto').notEmpty()
  req
    .check(
      'registrationCar',
      'Debe ingresar la patente del auto con el que participará'
    )
    .notEmpty()
  req.check('colorCar', 'Debe ingresar el color del auto').notEmpty()
  req.check('styleCar', 'Debe ingresar el estilo del auto').notEmpty()
  req.check('yearCar', 'Debe ingresar el año o modelo de su auto').notEmpty()
  req.check('versionCar', 'Debe ingresar la versión de su auto').notEmpty()
  req
    .check('VTV', 'Debe especificar si tiene Verificación Técnica Vehicular')
    .notEmpty()
  req
    .check(
      'travelPeople',
      'Debe especificar cuántas personas viajan en su auto'
    )
    .notEmpty()
  req
    .check(
      'arrivalDate',
      'Debe especificar la fecha aprox que llegará a Misiones'
    )
    .notEmpty()
  req
    .check(
      'dateToProvince',
      'Debe especificar la fecha que regresará a su provincia'
    )
    .notEmpty()
  req
    .check(
      'paymentWithMP',
      'Debe especificar si pagará en efectivo o con MercadoPago'
    )
    .notEmpty()
    .isBoolean()

  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}
const getInscriptionValidator = (req, res, next) => {
  req
    .check('email', 'El email deberia ser entre 4 y 32 caracteres')
    .matches(/.+\@.+\..+/)
    .withMessage('El email debe contener @')
    .isLength({
      min: 4,
      max: 32
    })
  req.check('DNI', 'El DNI es obligatorio').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}
export { userSignupValidator, inscriptionValidator, getInscriptionValidator }
