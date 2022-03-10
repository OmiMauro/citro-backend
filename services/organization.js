import organizationRepository from '../repositories/organizations.js'

const getById = async (id) => {
  return await organizationRepository.getById(id)
}
const update = async (id, organization) => {
  return await organizationRepository.update(id, organization)
}
const create = async (body) => {
  const organization = await organizationRepository.create(body)
  if (!organization) {
    const error = new Error('No se puede crear la organizacion')
    error.status = 404
    throw error
  }
  return organization
}
const getAll = async () => {
  return await organizationRepository.getAll()
}

const organizationServices = { getById, update, create, getAll }
export default organizationServices
