import { createApp } from './app'

const PORT = process.env.PORT || 5000
const app = createApp()

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server is shutting down')
  })
})
