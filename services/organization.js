import organizationRepository from '../repositories/organizations.js'

const getById = async (id) => {
  return await organizationRepository.getById(id)
}
const update = async (id, organization) => {
  return await organizationRepository.update(id, organization)
}
const create = async (organization) => {
  return await organizationRepository.create(organization)
}
const getAll = async () => {
  return await organizationRepository.getAll()
}

export { getById, update, create, getAll }
