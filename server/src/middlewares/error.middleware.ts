import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { BadRequestError, ErrorResponse } from '~/core/error.response'
import Logger from '~/utils/logger'

// Middleware xử lý lỗi
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.error(err.message, { stack: err.stack })

  if (err instanceof ErrorResponse) {
    err.send(res)
  } else {
    const error = new BadRequestError({ message: 'Internal Server Error' })
    error.send(res)
  }
}
