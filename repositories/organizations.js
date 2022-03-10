import { Organizations } from '../models/organization.js'

const getById = async (id) => {
  return await Organizations.findById(id)
}
const update = async (id, organization) => {
  return await Organizations.findByIdAndUpdate(id, organization)
}
const create = async (organization) => {
  return await Organizations.create(organization)
}

const organizationRepository = { getById, update, create }

export default organizationRepository
