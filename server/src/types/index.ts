import { NextFunction, Request, Response } from 'express'

export type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>
