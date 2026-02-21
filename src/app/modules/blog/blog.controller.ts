import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { blogService } from './blog.service'

const blogCreate = catchAsync(async (req, res) => {
  const payload = req.body

  payload.author = req.user._id

  const result = await blogService.createBlogIntoDB(payload)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is create Successfully',
    data: result,
  })
})

const getAllBlog = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogFromDB(req.query)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog Retrieve data Successfully',
    data: result,
  })
})

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await blogService.getSingleBlogFromDB(id as string)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog Retrieve single data Successfully',
    data: result,
  })
})

const updateSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await blogService.updateBlogIntoDB(
    id as string,
    req.user._id,
    payload,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog Update Successfully',
    data: result,
  })
})

const deleteSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const { role } = req.user

  await blogService.deleteBlogFromDB(id as string, role, req.user._id)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Delete Blog single data Successfully',
  })
})

export const blogController = {
  blogCreate,
  getAllBlog,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
}
