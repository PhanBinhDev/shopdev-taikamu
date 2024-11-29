import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: 'Validation failed',
        errors: error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    } else {
      next()
    }
  }
}
