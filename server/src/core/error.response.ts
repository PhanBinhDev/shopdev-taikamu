import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { ErrorConstructor } from '~/types'

class ErrorResponse extends Error {
  status: StatusCodes
  constructor({ message, statusCode = 'BAD_REQUEST' }: ErrorConstructor) {
    super(message)

    const httpStatus = StatusCodes[statusCode as keyof typeof StatusCodes]
    this.status = httpStatus ?? StatusCodes.BAD_REQUEST
  }
  send(res: Response) {
    console.log(this)
    return res.status(this.status).json({
      message: this.message,
      statusCode: this.status
    })
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor({
    message = ReasonPhrases.CONFLICT,
    statusCode = 'CONFLICT'
  }: ErrorConstructor) {
    super({ message, statusCode })
  }
}

class BadRequestError extends ErrorResponse {
  constructor({
    message = ReasonPhrases.BAD_REQUEST,
    statusCode = 'BAD_REQUEST'
  }: ErrorConstructor) {
    super({ message, statusCode })
  }
}

class AuthFailureError extends ErrorResponse {
  constructor({
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = 'UNAUTHORIZED'
  }: ErrorConstructor) {
    super({ message, statusCode })
  }
}

class NotFoundError extends ErrorResponse {
  constructor({
    message = ReasonPhrases.NOT_FOUND,
    statusCode = 'NOT_FOUND'
  }: ErrorConstructor) {
    super({ message, statusCode })
  }
}

class ForbiddenError extends ErrorResponse {
  constructor({
    message = ReasonPhrases.FORBIDDEN,
    statusCode = 'FORBIDDEN'
  }: ErrorConstructor) {
    super({ message, statusCode })
  }
}

export {
  ErrorResponse,
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
  NotFoundError,
  ForbiddenError
}
