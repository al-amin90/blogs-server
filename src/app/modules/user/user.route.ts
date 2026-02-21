import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userValidator } from './user.validate'
import { userController } from './user.controller'
import { USER_ROLE } from './user.constant'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/register',
  validateRequest(userValidator.registerValidationSchema),
  userController.registerUser,
)
router.post(
  '/login',
  validateRequest(userValidator.loginValidationSchema),
  userController.loginUser,
)
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  userController.adminUserBlock,
)
// router.get('/:id', blogController.getSingleBlog)
// router.patch('/:id', blogController.updateSingleBlog)
// router.delete('/:id', blogController.deleteSingleBlog)

const authRouter = router

export default authRouter
