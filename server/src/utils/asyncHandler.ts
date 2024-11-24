import { Request, Response, NextFunction } from 'express'
import { AsyncFunction } from '~/types'

export const asyncHandler =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
