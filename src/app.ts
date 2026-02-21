import express, { Application } from 'express'
import router from './app/routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['localhost:3000'] }))

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
