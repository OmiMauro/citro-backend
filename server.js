import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import createError from 'http-errors'
import connectDB from './models/index.js'
import { indexRouter } from './routes/index.js'
import Sentry from '@sentry/node'
import Tracing from '@sentry/tracing'
import config from './config/config.js'
import helmet from 'helmet'
const app = express()

const corsOptions = {
  origin: '*', // Reemplazar con dominio
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Configs for Sentry
Sentry.init({
  dsn: config.sentry.dsn,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
// RequestHandler creates a separate execution context using domains, so that every
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use(cors(corsOptions))
// middleware
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(logger('dev'))

connectDB()

app.use('/api/v2', indexRouter)

app.use(Sentry.Handlers.errorHandler())

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
    return res.status(err.status).json({ errors: [err.validationError] })
  }

  res.status(err.status).json({ errors: [err.message] })
})

export default app
