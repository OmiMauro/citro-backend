import { Image } from '../models/images.js'
const addImage = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ msg: 'Please send image' })
    }
    const files = req.files
    files.forEach(async data => {
      const newImage = await new Image({
        url: data.path,
        filename: data.filename,
        user: req.profile._id
      })
      const saveImage = await newImage.save()
    })

    return res.status(200).json({ msg: 'Se guardaron las imagenes' })
  } catch (error) {
    return res.status(500).json(error)
  }
}
const getAllImages = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const images = await Image.find({}, { user: 0 }).skip(skip).limit(limit)
    return res.status(200).json({ images, msg: 'Fetched images' })
  } catch (error) {
    return res.status(500).json(error)
  }
}
const getImageById = async (req, res) => {
  try {
    const { id } = req.params
    const image = await Image.find({ _id: id })
    res.status(200).json({ image, msg: 'Image' })
  } catch (error) {
    res.status(500).json(error)
  }
}
const deleteAllImages = async (req, res) => {
  const response = await Image.deleteMany({})
  res.json(response)
}

export { addImage, getAllImages, getImageById, deleteAllImages }
