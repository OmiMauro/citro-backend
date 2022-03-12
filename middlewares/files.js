import multer from 'multer'

const validateSingleImage = ({ required = false, keyName = 'image' }) => {
  const middlewareForMulter = (req, res, next) => {
    try {
      const multerConfig = getSingleImage()
      const uploadImage = multer(multerConfig)
      const upload = uploadImage.single(keyName)
      upload(req, res, error => {
        if (error || (!req.file && required)) {
          const errorMsg = error ? error.message : 'Imagen requerida'
          const obj = errorValidation(errorMsg, keyName)
          res.status(400).json(obj)
        }
        next()
      })
    } catch (error) {
      next(error)
    }
  }
  return middlewareForMulter
}

const getSingleImage = () => {
  const storage = multer.diskStorage({
    destination: './public/temp'
  })
  const limits = {
    files: 1,
    fileSize: 10 * 1024 * 1024 // 10Mb
  }
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg+xml') {
      cb(null, true)
    } else {
      // reject file
      cb({ message: 'Formato de archivo no soportado' }, false)
    }
  }
  return {
    storage, limits, fileFilter
  }
}
const validateArrayImage = ({ required = false, keyName = 'image' } = { required: false, keyName: 'image' }) => {
  const middlewareForMulter = (req, res, next) => {
    try {
      const multerConfig = getArrayImage()
      const uploadImage = multer(multerConfig)
      const upload = uploadImage.array(keyName)
      upload(req, res, error => {
        if (error || (!req.file && required)) {
          const errorMsg = error ? error.message : 'Imagen requerida'
          const obj = errorValidation(errorMsg, keyName)
          res.status(400).json(obj)
        }
        next()
      })
    } catch (error) {
      next(error)
    }
  }
  return middlewareForMulter
}

const getArrayImage = () => {
  const storage = multer.diskStorage({
    destination: '/public/temp/galery'
  })
  const limits = {
    files: 50,
    fileSize: 8 * 1024 * 1024 // 8Mb
  }
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true)
    } else {
      cb({ message: 'Formato de archivo no soportado' }, false)
    }
  }
  return {
    storage, limits, fileFilter
  }
}

const errorValidation = (msg, fieldName) => {
  const errors = [{
    msg, param: fieldName, location: 'body'
  }]
  return errors
}
export default { validateSingleImage, validateArrayImage }
