import { Router } from 'express'
import { blogController } from '../blog/blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import blogValidationSchema from '../blog/blog.validate'

const router = Router()

router.post(
  '/register',
  validateRequest(blogValidationSchema),
  blogController.blogCreate,
)
// router.get('/', blogController.getAllBlog)
// router.get('/:id', blogController.getSingleBlog)
// router.patch('/:id', blogController.updateSingleBlog)
// router.delete('/:id', blogController.deleteSingleBlog)

const authRouter = router

export default authRouter
