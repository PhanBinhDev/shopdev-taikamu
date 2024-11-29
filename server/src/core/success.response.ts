import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { SuccessConstructor } from '~/types'

export class SuccessResponse {
  statusCode: StatusCodes
  message: string
  metadata: any;
  [key: string]: any
  constructor({
    message = ReasonPhrases.OK,
    statusCode = StatusCodes.OK,
    metadata = {}
  }: SuccessConstructor) {
    this.statusCode = statusCode
    this.message = message
    this.metadata = metadata
  }
  send(res: Response, headers = {}) {
    return res.status(this.statusCode).json(this)
  }
}

export class OK extends SuccessResponse {
  constructor({ message, metadata }: { message: string; metadata: object }) {
    super({ message, statusCode: StatusCodes.OK, metadata })
  }
}

export class CREATED extends SuccessResponse {
  constructor({
    message,
    metadata,
    options = {}
  }: {
    message: string
    metadata: any
    options?: object
  }) {
    super({ message, statusCode: StatusCodes.CREATED, metadata })
    this.options = options
  }
}
