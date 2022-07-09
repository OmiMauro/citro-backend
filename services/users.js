import usersRepository from '../repositories/users.js'

const getById = async (id) => {
  const user = await usersRepository.getById(id)
  if (!user) {
    const error = new Error('No se pudo encontrar el usuario')
    error.status = 404
    throw error
  }
  return user
}
const update = async (id, body) => {
  const { name, lastname, DNI, dateBirth, phone } = body
  const user = await usersRepository.update(id, {
    name,
    lastname,
    DNI,
    dateBirth,
    phone,
  })
  if (!user) {
    const error = new Error('No se pudo actualizar los datos del usuario')
    error.status = 400
    throw error
  }
  return user
}

const remove = async (id) => {
  const user = await usersRepository.remove(id)
  if (!user) {
    const error = new Error('No se puede eliminar el usuario')
    error.status = 404
    throw error
  }
  return user
}
const comparePassword = async () => {}
const checkPasswords = async () => {}

export default { getById, update, remove }
