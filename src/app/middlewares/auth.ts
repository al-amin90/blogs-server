import { NextFunction, Request, Response } from 'express'
import { TUserRole } from '../modules/user/user.interface'
import catchAsync from '../utils/catchAsync'
import status from 'http-status'
import AppError from '../errors/AppError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import UserModel from '../modules/user/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization || ''

    const [, token] = authorization.split(' ')
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!')
    }

    const decoded = jwt.verify(token, config.jwt_access_token as string)
    const { role, email } = decoded as JwtPayload

    const user = await UserModel.isUserExist(email)

    if (!user) {
      throw new AppError(status.UNAUTHORIZED, 'Invalid credentials')
    }

    if (user?.isBlocked) {
      throw new AppError(status.UNAUTHORIZED, 'User is Blocked')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized.')
    }

    req.user = decoded as JwtPayload

    next()
  })
}

export default auth
