import { NextFunction, Request, Response } from 'express'
import { SuccessResponse } from '~/utils/success'

export const login = async (req: Request, res: Response) => {
  console.log({ req })
  new SuccessResponse({
    message: 'Logged in successfully',
    metadata: { user: req.user }
  })
}
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.json({ message: 'Logged out' })
  })
}
