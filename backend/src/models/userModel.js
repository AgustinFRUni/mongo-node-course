import { mongoose } from 'mongoose'
import bcrypt from 'bcrypt'

process.loadEnvFile()

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
},
  {
    versionKey: false
  })

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('User', UserSchema)

export { User }
