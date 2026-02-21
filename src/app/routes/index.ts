import { Router } from 'express'
import blogRouter from '../modules/blog/blog.route'
import authRouter from '../modules/user/user.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/admin', authRouter)
router.use('/blogs', blogRouter)

export default router
