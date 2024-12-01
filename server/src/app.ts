import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'

import router from '~/routes'
import config from '~/configs/env.config'

import { loggerMiddleware } from './middlewares/logger.middleware'
import { rateLimiter } from './middlewares/rateLimiter.middleware'
import { errorHandler } from './middlewares/error.middleware'
import { NotFoundError } from './core/error.response'

export function createApp() {
  // Config isProduction variable
  const isProduction = config.NODE_ENV === 'production'
  const app = express()

  app.use(
    cors({
      credentials: true,
      origin: isProduction
        ? 'https://your-frontend-url.com'
        : 'http://localhost:5173'
    })
  )

  // config app
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(express.json())
  app.use(cookieParser())

  // all routes
  app.use('/api/v1', router)

  // Error handling & middlewares
  app.use(loggerMiddleware)
  app.use(rateLimiter)

  app.use((req, res, next) => {
    next(
      new NotFoundError({
        message: `Route ${req.originalUrl} not found`,
        statusCode: 'NOT_FOUND'
      })
    )
  })

  app.use(errorHandler)

  // serve static files from React
  if (isProduction) {
    app.use(express.static(path.join(__dirname, '../client/dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }

  return app
}
