import mongoose from 'mongoose'
import app from './app'
import { Server } from 'http'
import config from './app/config'

let server: Server

async function main() {
  await mongoose.connect(config.database_url as string)

  server = app.listen(config.port, () => {
    console.log(`Server is running on Port: ${config.port}`)
  })
}

main().catch(err => console.log(err))

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `unhandledRejection is detected, shutting down...`,
    promise,
    'reason:',
    reason,
  )

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }

  process.exit(1)
})

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err)
  process.exit(1)
})
