import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

export interface ErrorConstructor {
  message?: string
  statusCode?: keyof typeof StatusCodes
}

export interface SuccessConstructor {
  message: string
  statusCode?: StatusCodes
  metadata: any
  [key: string]: any
}

export interface Cookie {
  name: string
  value: string
  options?: Partial<{
    httpOnly: boolean
    secure: boolean
    sameSite: 'strict' | 'lax' | 'none'
    expires: Date
  }>
}

export interface CookieOptions {
  cookies: Cookie[]
  res: any // Replace `any` with the proper type of your response object if available
}
