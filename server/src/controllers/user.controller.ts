import { Request, Response } from 'express-serve-static-core'
import { CREATED, SuccessResponse } from '~/core/success.response'
import userService from '~/services/user.service'
import { asyncHandler } from '~/utils/asyncHandler'

const getUser = async (req: Request, res: Response) => {
  res.json({
    message: 'Hello'
  })
}

const createUser = asyncHandler(async (req: Request, res: Response) => {
  new CREATED({
    message: 'User created successfully',
    metadata: await userService.createUser(req.body)
  }).send(res)
})

export { getUser, createUser }
