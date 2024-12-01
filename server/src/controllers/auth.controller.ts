import { NextFunction, Request, Response } from 'express'
import AuthService from '~/services/auth.service'
import { SuccessResponse } from '~/core/success.response'
import { asyncHandler } from '~/utils/asyncHandler'

const signIn = asyncHandler(async (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Logged in successfully',
    metadata: await AuthService.signIn(req.body, res, req)
  }).send(res)
})
const checkAuth = asyncHandler(async (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'OK',
    metadata: await AuthService.checkAuth(req)
  }).send(res)
})
const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Token refreshed successfully',
    metadata: await AuthService.refreshToken(res, req)
  }).send(res)
})

const signOut = asyncHandler(async (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Logged out successfully',
    metadata: await AuthService.signOut(req, res)
  }).send(res)
})
export { signIn, checkAuth, refreshToken, signOut }
