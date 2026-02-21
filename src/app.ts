import express, { Application } from 'express'
import router from './app/routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import notFound from './app/middlewares/notFound'
import GlobalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

// _____) Parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['localhost:3000'] }))

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// _____) Global Eror handler
app.use(GlobalErrorHandler)
app.use(notFound)

export default app
