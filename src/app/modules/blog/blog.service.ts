import status from 'http-status'
import AppError from '../../errors/AppError'
import UserModel from '../user/user.model'
import { TBlog } from './blog.interface'
import BlogModel from './blog.model'

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload)
  return result
}

const getAllBlogFromDB = async query => {
  const result = await BlogModel.find()
  return result
}

const getSingleBlogFromDB = async (id: string) => {
  const result = await BlogModel.findById(id)

  return result
}

const updateBlogIntoDB = async (
  id: string,
  author: string,
  payload: Partial<TBlog>,
) => {
  const result = await BlogModel.findOneAndUpdate(
    { _id: id, author },
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
  console.log('result', result)
  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'You cant update is blog ')
  }

  return result
}

const deleteBlogFromDB = async (id: string, author: string) => {
  const result = await BlogModel.findOneAndDelete({ _id: id, author })

  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'You cant delete is blog ')
  }
  return result
}

export const blogService = {
  createBlogIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
}
