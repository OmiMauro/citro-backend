import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import expressValidator from 'express-validator'
import dotenv from 'dotenv/config'
// Routes of application

// import routes
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'
import inscriptionRoutes from './routes/inscriptionRoute.js'
const App = express()

App.use(express.static('build'))
// db
/* mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log('DB Connected')) */

// middleware
App.use(morgan('dev'))
App.use(bodyParser.json())
App.use(cookieParser())
App.use(expressValidator())
App.use(cors())

// routes middleware
App.use('/api', authRoutes)
App.use('/api', userRoutes)

const port = process.env.PORT || 8000

App.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
