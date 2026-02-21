import { Router } from 'express'
import blogRouter from '../modules/blog/blog.route'

const router = Router()

router.use('/blogs', blogRouter)

export default router
