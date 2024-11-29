import { NextFunction, Request, Response } from 'express'
import AuthService from '~/services/auth.service'
import { SuccessResponse } from '~/core/success.response'
import { asyncHandler } from '~/utils/asyncHandler'

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Logged in successfully',
    metadata: await AuthService.signIn(req.body)
  }).send(res)
})
