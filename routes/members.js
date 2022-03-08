import Express from 'express'
import membersControlllers from '../controllers/members.js'
const router = Express.Router()

router.get('/', membersControlllers.getAll)
router.post('/', membersControlllers.create)
router.get('/:id', membersControlllers.getById)
router.put('/:id', membersControlllers.update)
router.delete('/:id', membersControlllers.remove)

export default router
