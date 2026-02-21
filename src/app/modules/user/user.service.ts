import status from 'http-status'
import { TUser } from './user.interface'
import UserModel from './user.model'
import AppError from '../../errors/AppError'

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload)
  return result
}

const loginUserIntoDB = async (payload: Pick<TUser, 'email' | 'password'>) => {
  const user = await UserModel.isUserExist(payload.email)

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found')
  }

  if (user?.isBlocked) {
    throw new AppError(status.BAD_REQUEST, 'User is Blocked')
  }

  return user
}

export const userService = {
  createUserIntoDB,
  loginUserIntoDB,
}
