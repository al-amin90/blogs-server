import { model, Schema } from 'mongoose'
import { IUserModel, TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
import AppError from '../../errors/AppError'
import status from 'http-status'

const userSchema = new Schema<TUser>(
  {
    name: String,
    email: { type: String, unique: true, index: true },
    password: String,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    statics: {
      async isUserExist(email) {
        return await this.findOne({ email })
      },
    },
    timestamps: true,
  },
)

userSchema.pre('save', async function () {
  const isExist = await UserModel.findOne({ email: this.email })
  if (isExist) {
    throw new AppError(status.CONFLICT, 'This email already exist')
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

const UserModel = model<TUser, IUserModel>('User', userSchema)

export default UserModel
