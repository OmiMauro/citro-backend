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
    res.status(201).json({ message: 'Su inscripción se registró con exito! Ahora será redireccionado a MercadoPago para realizar el pago de la misma!' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const getInscripcionByDNI = async (req, res) => {
  try {
    const { email, DNI } = req.body

    const findInscription = await Inscription.findOne({ DNI }, {
      name: 1,
      lastname: 1,
      DNI: 1,
      email,
      orders: 1,
      _id: 0
    }).populate('orders', {
      status: 1,
      _id: 0

    })
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
    const listInscriptions = await Orders.find({}, {
      status: 1,
      status_detail: 1,
      date_last_updated: 1,
      net_received_amount: 1,
      total_paid_amount: 1,
      transaction_amount_refunded: 1,
      id_Operacion: 1,
      _id: 0,
      unit_price: 1
    })
      .populate('inscription', {
        orders: 0,
        _id: 0,
        createdAt: 0,
        updatedAt: 0
      })

    res.status(201).json({ listInscriptions })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const inscriptionsApproved = async (req, res) => {
  try {
    const response = await Orders.find({ status: 'approved' }, {
      status: 1,
      status_detail: 1,
      id_Operacion: 1,
      date_last_updated: 1,
      net_received_amount: 1,
      total_paid_amount: 1,
      transaction_amount_refunded: 1,
      _id: 0,
      unit_price: 1
    }).populate('inscription', {
      orders: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0

    })

    res.status(201).json({ response })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const inscriptionsPending = async (req, res) => {
  try {
    const response = await Orders.find({ status: 'pending' }, {
      status: 1,
      status_detail: 1,
      date_last_updated: 1,
      net_received_amount: 1,
      total_paid_amount: 1,
      id_Operacion: 1,
      unit_price: 1,
      _id: 0
    }).populate('inscription', { name: 1, lastname: 1, DNI: 1, _id: 0 })
    res.status(201).json({ response })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const inscriptionsRejected = async (req, res) => {
  try {
    const response = await Orders.find({ status: 'rejected' }, {
      status: 1,
      status_detail: 1,
      date_last_updated: 1,
      net_received_amount: 1,
      total_paid_amount: 1,
      transaction_amount_refunded: 1,
      _id: 0,
      unit_price: 1
    }).populate('inscription', { name: 1, lastname: 1, DNI: 1, _id: 0 })

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
    const response = await Orders.findById(reference, { inscription: 1, _id: 0 })
      .populate('inscription', {
        DNI: 1,
        name: 1,
        lastname: 1,
        _id: 0
      })
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
