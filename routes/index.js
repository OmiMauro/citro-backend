import Express from 'express'

import roles from './roles.js'

const indexRouter = Express.Router()

indexRouter.use('/roles', roles)
export { indexRouter }
