import Express from 'express'

import activities from './activities'
import cars from './cars.js'
import galery from './galery.js'
import inscriptions from './inscriptions.js'
import news from './news.js'
import roles from './roles.js'
import slides from './slides.js'
import users from './users.js'

const indexRouter = Express.Router()

indexRouter.use('/activities', activities)
indexRouter.use('/cars', cars)
indexRouter.use('/galery', galery)
indexRouter.use('/inscriptions', inscriptions)
indexRouter.use('/news', news)
indexRouter.use('/roles', roles)
indexRouter.use('/slides', slides)

indexRouter.use('/users', users)

export { indexRouter }
