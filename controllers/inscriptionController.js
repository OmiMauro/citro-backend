import Inscription from '../models/inscription.js'

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

const listInscriptions = async (req, res) => {
  try {
    const listInscriptions = await Inscription.find().populate('Order').sort({ lastname: 1, name: 1 }).select({ _id: 0 }).exec()
    res.status(200).json({ listInscriptions })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export { addInscription, listInscriptions }
