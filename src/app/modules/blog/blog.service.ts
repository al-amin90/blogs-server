import status from 'http-status'
import AppError from '../../errors/AppError'
import { TBlog } from './blog.interface'
import BlogModel from './blog.model'
import QueryBuilder from '../../builder/QueryBuillder'

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload)
  return result
}

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const BlogQuery = new QueryBuilder(BlogModel.find(), query)
    .search(['title', 'content'])
    .filter()
    .sort()
    .fields()

  const result = await BlogQuery.modelQuery
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

const deleteBlogFromDB = async (id: string, role: string, author: string) => {
  let result
  console.log('deleteSingleBlog', role)

  if (role === 'admin') {
    result = await BlogModel.findByIdAndDelete(id)
  } else {
    result = await BlogModel.findOneAndDelete({ _id: id, author })
  }

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
