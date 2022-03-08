import mongoose from 'mongoose'
import config from '../config/config.js'
// db
const connectDB = async () => {
  try {
    const conection = await mongoose.connect(config.development.uriDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log('conect DB')
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
