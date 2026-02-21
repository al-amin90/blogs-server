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

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBlogFromDB = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id)

  return result
}

export const blogService = {
  createBlogIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
}
