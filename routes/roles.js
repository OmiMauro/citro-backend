import Express from 'express'
import rolesController from '../controllers/roles.js'

const router = Express.Router()
router.get('/')
router.post('/')
router.get('/:id')
router.put('/:id')
router.delete('/:id')

export default router
