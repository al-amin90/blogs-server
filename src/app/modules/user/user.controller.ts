import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await userService.createUserIntoDB(payload)

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Register Successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const payload = req.body
  const token = await userService.loginUserIntoDB(payload)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Login Successfully',
    data: { token },
  })
})

const adminUserBlock = catchAsync(async (req, res) => {
  const id = req.params.userId
  await userService.adminUserBlockIntoDB(id as string)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Blocked Successfully',
  })
})

export const userController = {
  registerUser,
  loginUser,
  adminUserBlock,
}
