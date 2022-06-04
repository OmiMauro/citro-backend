import carsServices from '../services/cars.js'

const create = async (req, res) => {
  try {
    const car = await carsServices.create(req.body, req.authUser)
    res.status(201).json({ msg: 'Se agrego el auto con exito', data: car })
  } catch (error) {
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}
const update = async (req, res) => {}
const remove = async (req, res) => {}
const getAll = async (req, res) => {}
const getById = async (req, res) => {}

export default { create, update, remove, getAll, getById }
