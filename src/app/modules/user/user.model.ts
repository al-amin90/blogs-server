import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
  isBlocked: Boolean,
})

const UserModel = model('User', userSchema)

export default UserModel
