import { NextFunction, Request, Response } from 'express'
import Logger from '~/utils/logger'

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = new Date().getTime()

  res.on('finish', () => {
    const duration = new Date().getTime() - startTime

    Logger.http(
      `${req.method} ${req.originalUrl} ${req.statusCode} ${duration}ms`
    )
  })

  next()
}
