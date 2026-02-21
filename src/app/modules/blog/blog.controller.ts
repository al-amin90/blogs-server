import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { blogService } from './blog.service'

const blogCreate = catchAsync(async (req, res) => {
  const payload = req.body
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

  const result = await blogService.getSingleBlogFromDB(id)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog Retrieve single data Successfully',
    data: result,
  })
})

const updateSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const { Blog } = req.body

  const result = await blogService.updateBlogIntoDB(id, Blog)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog Update Successfully',
    data: result,
  })
})

const deleteSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await blogService.deleteBlogFromDB(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Delete Blog single data Successfully',
    data: result,
  })
})

export const blogController = {
  blogCreate,
  getAllBlog,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
}
