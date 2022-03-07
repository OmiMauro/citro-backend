import Express from 'express'
import news from './news.js'
import roles from './roles.js'
import users from './users.js'
import slides from './slides.js'
import cars from './cars.js'

const indexRouter = Express.Router()

indexRouter.use('/cars', cars)
indexRouter.use('/news', news)
indexRouter.use('/roles', roles)
indexRouter.use('/users', users)
indexRouter.use('/slides', slides)

export { indexRouter }
