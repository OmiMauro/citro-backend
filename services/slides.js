import slidesRepository from '../repositories/slides.js'

const getById = async (id) => {
  const slide = await slidesRepository.getById(id)
  if (!slide) {
    const error = new Error('No se pudo encontrar el slide con el ID')
    error.status = 404
    throw error
  }
  return slide
}
const update = async (id, body) => {
  const slide = await slidesRepository.update(id, body)
  if (!slide) {
    const error = new Error('No se pudo encontrar el slide con el ID')
    error.status = 404
    throw error
  }
  return slide
}
const create = async (body) => {
  const slide = await slidesRepository.create(body)
  if (!slide) {
    const error = new Error('No se pudo encontrar el slide con el ID')
    error.status = 404
    throw error
  }
  return slide
}
const getAll = async () => {
  const slide = await slidesRepository.getAll()
  if (!slide) {
    const error = new Error('No se pudo encontrar la organizacion con el ID')
    error.status = 404
    throw error
  }
  return slide
}
const remove = async id => {
  const slide = await slidesRepository.remove(id)
  if (!slide) {
    const error = new Error('No se pudo encontrar la organizacion con el ID')
    error.status = 404
    throw error
  }
  return slide
}

export default { getById, update, create, getAll, remove }
