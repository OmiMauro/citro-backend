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
    console.log(req.body)
    const { email, DNI } = req.body
    const findInscription = await Inscription.findOne({ DNI }).populate('order', { status: 1 })
    console.log(findInscription)
    if (findInscription && findInscription.email === email) {
      res.status(201).json({ message: 'El DNI ingresado ya se encuentra registrado y el  Te esperamos!', findInscription })
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const listInscriptions = async (req, res) => {
  try {
    const listInscriptions = await Orders.find({}).populate('inscription', { orders: 0, _id: 0, createdAt: 0, updatedAt: 0 })
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
    const response = await Orders.find({ status: { $ne: 'approved' } }).populate('inscription', { name: 1, lastname: 1, DNI: 1 })
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
export {
  addInscription, listInscriptions, inscriptionsApproved,
  inscriptionsPending, inscriptionsRejected, getInscripcionByDNI, deleteAllInscriptionsAndOrders
}
