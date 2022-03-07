import { Slides } from '../models/slides.js'

const getById = async (id) => {
  return await Slides.findById(id)
}
const update = async (id, slide) => {
  return await Slides.findByIdAndUpdate(id, slide)
}
const create = async (slide) => {
  return await Slides.create(slide)
}
const getAll = async () => {
  return await Slides.find({})
}
const remove = async id => {
  return await Slides.findByIdAndRemove(id)
}
const slidesRepository = { getById, update, create, getAll, remove }
export default slidesRepository
