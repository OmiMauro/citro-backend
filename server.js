import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import createError from 'http-errors'
import connectDB from './models/index.js'
import { indexRouter } from './routes/index.js'

const app = express()
app.use(cors())

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(logger('dev'))
connectDB()
app.use('/api', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // normalize error
  if (!err.status) {
    err.status = 500
    err.message = 'Internal Server Error'
  }

  if (err.validationError) {
    return res.status(err.status).json(err.validationError)
  }

  res.status(err.status).json({ error: err.message })
})
export default app
