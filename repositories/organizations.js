import { Organizations } from '../models/organization.js'

const getById = async (id) => {
  return await Organizations.findById(id)
}
const update = async (id, organization) => {
  const org = await Organizations.findByIdAndUpdate(id, organization)
  console.log('reppo', org)
  return org
}
const create = async (organization) => {
  return await Organizations.create(organization)
}

const organizationRepository = { getById, update, create }

export default organizationRepository
