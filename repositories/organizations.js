import { Organization } from '../models/organization.js'

const getById = async (id) => {
  return await Organization.findById(id)
}
const update = async (id, organization) => {
  return await Organization.findByIdAndUpdate(id, organization)
}
const create = async (organization) => {
  return await Organization.create(organization)
}
const getAll = async () => {
  return await Organization.find({})
}

const organizationRepository = { getById, update, create, getAll }

export default organizationRepository
