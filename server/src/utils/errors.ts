import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export class AppError extends Error {
  status: StatusCodes
  constructor(message: string, status: StatusCodes) {
    super(message)
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode)
  }
}

export class AuthFailureError extends AppError {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode)
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message: string = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode)
  }
}

export class BadRequestError extends AppError {
  constructor(
    message: string = ReasonPhrases.BAD_REQUEST,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode)
  }
}
