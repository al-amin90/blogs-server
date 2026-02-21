import { model, Schema } from 'mongoose'
import { TBlog } from './blog.interface'

const blogSchema = new Schema<TBlog>(
  {
    title: String,
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const BlogModel = model('Blog', blogSchema)

export default BlogModel
