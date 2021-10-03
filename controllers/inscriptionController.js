import Inscription from '../models/inscription.js'
import Order from '../models/orders.js'
const unit_price = parseInt(process.env.price)

const addInscription = async (req, res) => {
  const {
    name,
    lastname,
    dateBirth,
    DNI,
    numberCell,
    provinceOrigin,
    locationOrigin,
    email,
    nameCar,
    registrationCar,
    colorCar,
    styleCar,
    yearCar,
    versionCar,
    VTV,
    travelPeople,
    arrivalDate,
    dateToProvince
  } = req.body
  console.log(DNI, email)

  try {
    const findInscription = await Inscription.findOne({ DNI })
    console.log(findInscription)
    if (findInscription) {
      const updateInscription = await Inscription.findOneAndUpdate(
        { DNI: DNI },
        {
          name,
          lastname,
          dateBirth: new Date(dateBirth),
          numberCell,
          provinceOrigin,
          locationOrigin,
          email,
          nameCar,
          registrationCar,
          colorCar,
          styleCar,
          yearCar,
          versionCar,
          VTV,
          travelPeople,
          arrivalDate: new Date(arrivalDate),
          dateToProvince: new Date(dateToProvince)
        },
        { new: true }
      )
    } else {
      const newInscription = new Inscription({
        name,
        lastname,
        dateBirth,
        DNI,
        numberCell,
        provinceOrigin,
        locationOrigin,
        email,
        nameCar,
        registrationCar,
        colorCar,
        styleCar,
        yearCar,
        versionCar,
        VTV,
        travelPeople,
        arrivalDate,
        dateToProvince
      })
      const savedInscription = await newInscription.save()
      const orderEfectivo = await Order.create({
        title: `DNI ${DNI}`,
        unit_price,

        status_detail: 'PAGA EN EFECTIVO',
        inscription: savedInscription._id
      })
      const orderSaved = await orderEfectivo.save()
      savedInscription.orders.push(orderSaved._id)
      savedInscription.save()
      console.log(savedInscription, orderSaved)
    }
    res.status(201).json({
      message: 'Su inscripción se registró con exito!'
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const getInscripcionByDNI = async (req, res) => {
  const { email, DNI } = req.body
  try {
    const findInscription = await Inscription.findOne(
      { DNI },
      {
        name: 1,
        lastname: 1,
        DNI: 1,
        email: 1,
        orders: 1,
        _id: 0
      }
    ).populate('orders', {
      status: 1,
      init_point: 1,
      status_detail: 1,
      _id: 0
    })

    if (findInscription && findInscription.email === email) {
      return res.status(201).json({ inscription: findInscription })
    }
    return res.status(404).json({
      message:
        'No se encontró una inscripción relacionada a los datos ingresados.'
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const listInscriptions = async (req, res) => {
  try {
    const listInscriptions = await Order.find(
      {},
      {
        status: 1,
        status_detail: 1,
        date_last_updated: 1,
        net_received_amount: 1,
        total_paid_amount: 1,
        transaction_amount_refunded: 1,
        id_Operacion: 1,
        _id: 0,
        unit_price: 1
      }
    ).populate('inscription', {
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
    const response = await Order.find(
      { $or: [{ status: 'approved' }, { status_detail: 'efectivo' }] },
      {
        status: 1,
        status_detail: 1,
        id_Operacion: 1,
        date_last_updated: 1,
        net_received_amount: 1,
        total_paid_amount: 1,
        transaction_amount_refunded: 1,
        _id: 0,
        unit_price: 1
      }
    ).populate('inscription', {
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
    const response = await Order.find(
      { status: 'pending' },
      {
        status: 1,
        status_detail: 1,
        date_last_updated: 1,
        net_received_amount: 1,
        total_paid_amount: 1,
        id_Operacion: 1,
        unit_price: 1,
        _id: 0
      }
    ).populate('inscription', { name: 1, lastname: 1, DNI: 1, _id: 0 })
    res.status(201).json({ response })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const inscriptionsRejected = async (req, res) => {
  try {
    const response = await Order.find(
      { $or: [{ status: 'rejected' }, { status: 'cancelled' }] },
      {
        status: 1,
        status_detail: 1,
        date_last_updated: 1,
        net_received_amount: 1,
        total_paid_amount: 1,
        transaction_amount_refunded: 1,
        _id: 0,
        unit_price: 1
      }
    ).populate('inscription', { name: 1, lastname: 1, DNI: 1, _id: 0 })

    res.status(201).json({ response })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const deleteAllInscriptionsAndOrders = async (req, res) => {
  try {
    const inscriptionDelete = await Inscription.deleteMany({})
    const orderDelete = await Order.deleteMany({})
    res.status(200).json({ inscriptionDelete, orderDelete })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
const findDataInscription = async (req, res) => {
  try {
    const reference = req.params.external_reference
    const response = await Order.findById(reference, {
      inscription: 1,
      _id: 0
    }).populate('inscription', {
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
  addInscription,
  listInscriptions,
  inscriptionsApproved,
  inscriptionsPending,
  inscriptionsRejected,
  getInscripcionByDNI,
  deleteAllInscriptionsAndOrders,
  findDataInscription
}
