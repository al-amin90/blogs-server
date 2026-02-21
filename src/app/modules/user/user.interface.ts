import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUser = {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isBlocked: boolean
}

export interface IUserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser> | null
  isPasswordMatch(
    password: string,
    hashPassword: string,
  ): Promise<string> | null
}

export type TUserRole = keyof typeof USER_ROLE
