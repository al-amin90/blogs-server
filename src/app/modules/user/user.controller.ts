import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await userService.createUserIntoDB(payload)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Register Successfully',
    data: result,
  })
})

export const userController = {
  registerUser,
}
