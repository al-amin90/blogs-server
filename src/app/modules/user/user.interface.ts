import { Types } from 'mongoose'

export type TUser = {
  name: string
  email: string
  password: Types.ObjectId
  role: 'admin' | 'user'
  isBlocked: boolean
}
