import { Router } from 'express'
import { blogController } from './blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import blogValidationSchema from './blog.validate'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/create',
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema),
  blogController.blogCreate,
)

router.get('/', blogController.getAllBlog)
router.get('/:id', blogController.getSingleBlog)
router.patch('/:id', blogController.updateSingleBlog)
router.delete('/:id', blogController.deleteSingleBlog)

const blogRouter = router

export default blogRouter
