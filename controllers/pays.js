import paysService from '../services/pays.js'
const getById = async (req, res) => {
  try {
    const pay = await paysService.getById(req.params.id)
    return res.status(200).json({ data: pay })
  } catch (error) {
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}

const update = async (req, res) => {
  try {
    const pay = await paysService.update(
      req.params.id,
      req.authUser._id,
      req.body
    )
    return res.status(200).json({ data: pay })
  } catch (error) {
    res
      .status(error.status)
      .json({ errors: [{ msg: error.message }], data: false })
  }
}

export default { getById, update }
