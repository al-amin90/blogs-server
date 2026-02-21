import status from 'http-status'
import { TUser } from './user.interface'
import UserModel from './user.model'
import AppError from '../../errors/AppError'
import config from '../../config'
import { createToken } from './user.utils'

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload)
  return result
}

const loginUserIntoDB = async (payload: Pick<TUser, 'email' | 'password'>) => {
  const { email, password } = payload

  const user = await UserModel.isUserExist(email)

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials')
  }

  if (user?.isBlocked) {
    throw new AppError(status.UNAUTHORIZED, 'User is Blocked')
  }

  const isMatch = await UserModel.isPasswordMatch(password, user.password)

  if (!isMatch) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials')
  }

  const jwtPayload = {
    _id: user._id?.toString() || '',
    email: user.email,
    role: user?.role,
  }

  const token = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  )

  return token
}

const adminUserBlockIntoDB = async (id: string) => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    { isBlocked: true },
    {
      new: true,
    },
  )
  console.log('result', result)
  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'You cant update is blog ')
  }

  return result
}

export const userService = {
  createUserIntoDB,
  loginUserIntoDB,
  adminUserBlockIntoDB,
}
