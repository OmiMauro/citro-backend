
import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  expiredAt: {
    type: Date
  }
},
{
  timestamps: true
})

const Token = mongoose.model('Token', tokenSchema)
export { Token }
/* https://stackoverflow.com/questions/39092822/how-to-confirm-email-address-using-express-node */
