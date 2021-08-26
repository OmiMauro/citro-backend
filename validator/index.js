const userSignupValidator = (req, res, next) => {
  req.check('name', 'El nombre es obligatorio').notEmpty()
  req.check('email', 'El email debe tener entre 3 y 32 caracteres. ')
    .matches(/.+\@.+\..+/)
    .withMessage('El email debe contener @')
    .isLength({
      min: 4,
      max: 32
    })
  req.check('password', 'La contraseña es obligatoria').notEmpty()
  req.check('password')
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
  req.check('email', 'El email deberia ser entre 4 y 32 caracteres')
    .matches(/.+\@.+\..+/)
    .withMessage('El email debe contener @')
    .isLength({
      min: 4,
      max: 32
    })
  req.check('numberCell', 'El número de celular es obligatorio').notEmpty()

  req.check('provinceOrigin', 'La provincia de origen es obligatorio').notEmpty()
  req.check('locationOrigin', 'La localidad de origen es obligatorio').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}
const getInscriptionValidator = (req, res, next) => {
  req.check('email', 'El email deberia ser entre 4 y 32 caracteres')
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
