import Express from 'express'

import roles from './roles.js'
import users from './users.js'

const indexRouter = Express.Router()

indexRouter.use('/roles', roles)
indexRouter.use('/users', users)

export { indexRouter }
