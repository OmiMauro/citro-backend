import Inscription from '../models/inscription.js'
import Orders from '../models/orders.js'
const addInscription = async (req, res) => {
  try {
    const { name, lastname, DNI, email, numberCell, provinceOrigin, locationOrigin } = req.body
    const newInscription = new Inscription({
      name,
      lastname,
      DNI,
      email,
      numberCell,
      provinceOrigin,
      locationOrigin
    })
    const savedInscription = await newInscription.save()
    res.status(201).json({ message: 'Su inscripción se registró con exito! Te esperamos!' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const getInscripcionByDNI = async (req, res) => {
  try {
    const { email, DNI } = req.body

    const findInscription = await Inscription.findOne({ DNI }, { name: 1, lastname: 1, DNI: 1, email, orders: 1, _id: 0 }).populate('orders', { status: 1, _id: 0 })
    if (findInscription && findInscription.email === email) {
      return res.status(201).json({ findInscription })
    }
    return res.status(404).json({ message: 'No se encontró una inscripción relacionada a los datos ingresados.' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const listInscriptions = async (req, res) => {
  try {
    const listInscriptions = await Orders.find({})
      .populate('inscription', { orders: 0, _id: 0, createdAt: 0, updatedAt: 0 })
      .sort({ 'inscription.lastname': 1, 'inscription.name': 1 })
    /* .sort({ lastname: 1, name: 1 }).select({ _id: 0 }).exec() */
    res.status(201).json({ listInscriptions })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const inscriptionsApproved = async (req, res) => {
  try {
    const response = await Orders.find({ status: 'approved' }).populate('inscription', { name: 1, lastname: 1, DNI: 1 }).sort({ 'inscription.lastname': 1 })

    res.status(201).json({ response })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const inscriptionsPending = async (req, res) => {
  try {
    const response = await Orders.find({ status: 'pending' }).populate('inscription', { name: 1, lastname: 1, DNI: 1 })
    res.status(201).json({ response })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const inscriptionsRejected = async (req, res) => {
  try {
    const response = await Orders.find({ status: 'rejected' }).populate('inscription', { name: 1, lastname: 1, DNI: 1 })

    res.status(201).json({ response })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const deleteAllInscriptionsAndOrders = async (req, res) => {
  try {
    const inscriptionDelete = await Inscription.deleteMany({})
    const orderDelete = await Orders.deleteMany({})
    res.status(200).json({ inscriptionDelete, orderDelete })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const findDataInscription = async (req, res) => {
  try {
    const reference = req.params.external_reference
    const response = await Orders.findById(reference, { inscription: 1 })
      .populate('inscription', { DNI: 1, name: 1, lastname: 1 })
    if (response) {
      const newInscription = {
        DNI: response.inscription.DNI,
        name: response.inscription.name,
        lastname: response.inscription.lastname
      }
      res.status(201).json({ info: newInscription })
    } else {
      res.status(404)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
export {
  addInscription, listInscriptions, inscriptionsApproved,
  inscriptionsPending, inscriptionsRejected, getInscripcionByDNI, deleteAllInscriptionsAndOrders,
  findDataInscription
}
