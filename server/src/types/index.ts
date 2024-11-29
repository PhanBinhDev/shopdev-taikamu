import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

export interface ErrorConstructor {
  message: string
  statusCode?: keyof typeof StatusCodes
}

export interface SuccessConstructor {
  message: string
  statusCode?: StatusCodes
  metadata: any
  [key: string]: any
}
