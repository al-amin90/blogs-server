import catchAsync from '../../utils/catchAsync'

const blogCreate = catchAsync(async (req, res, next) => {
  // const result =
})

export const blogController = {
  blogCreate,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
}
