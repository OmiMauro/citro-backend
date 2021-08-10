const userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty()
  req.check('email', 'Email must be between 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
      min: 4,
      max: 32
    })
  req.check('password', 'Password is required').notEmpty()
  req.check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number')

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
    .withMessage('Email must contain @')
    .isLength({
      min: 4,
      max: 32
    })
  req.check('provinceOrigin', 'La provincia de origen es obligatorio').notEmpty()
  req.check('locationOrigin', 'La localidad de origen es obligatorio').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}
export { userSignupValidator, inscriptionValidator }
