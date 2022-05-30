import Express from 'express'

import activities from './activities.js'
import auth from './auth.js'
import cars from './cars.js'
import galery from './galery.js'
import inscriptions from './inscriptions.js'
import members from './members.js'
import news from './news.js'
import organizations from './organization.js'
import slides from './slides.js'
import users from './users.js'
import events from './events.js'
const indexRouter = Express.Router()

indexRouter.use('/activities', activities)
indexRouter.use('/auth', auth)
indexRouter.use('/cars', cars)
indexRouter.use('/galery', galery)
indexRouter.use('/inscriptions', inscriptions)
indexRouter.use('/members', members)
indexRouter.use('/news', news)
indexRouter.use('/organizations', organizations)
indexRouter.use('/slides', slides)
indexRouter.use('/events', events)
indexRouter.use('/users', users)

export { indexRouter }
