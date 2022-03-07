import Express from 'express'

import roles from './roles.js'
import users from './users.js'
import slides from './slides.js'
const indexRouter = Express.Router()

indexRouter.use('/roles', roles)
indexRouter.use('/users', users)
indexRouter.use('/slides', slides)
export { indexRouter }
