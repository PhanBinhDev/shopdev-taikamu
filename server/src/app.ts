import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from 'errorhandler'
import path from 'path'
import session from 'express-session'

import router from '~/routes'
import config from '~/configs/env.config'

import { loggerMiddleware } from './middlewares/logger.middleware'
import { rateLimiter } from './middlewares/rateLimiter.middleware'
import { ErrorRequest } from './middlewares/error.middleware'
import { NotFoundError } from './utils/errors'

export function createApp() {
  // Config isProduction variable
  const isProduction = config.NODE_ENV === 'production'
  const app = express()

  app.use(
    cors({
      credentials: true
    })
  )
  // config app
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(express.json())
  app.use(
    session({
      secret: config.SESSION_SECRET,
      cookie: { maxAge: +config.COOKIE_MAX_AGE, secure: isProduction },
      resave: false,
      saveUninitialized: false
    })
  )

  // all routes
  app.use('/api/v1', router)

  // Error handling & middlewares
  app.use(loggerMiddleware)
  app.use(rateLimiter)
  if (!isProduction) {
    app.use(errorHandler())
  }

  app.use((req, res, next) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`))
  })

  app.use(ErrorRequest)

  // serve static files from React
  if (isProduction) {
    app.use(express.static(path.join(__dirname, '../client/dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }

  return app
}
