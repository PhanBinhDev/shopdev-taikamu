import { Request, Response } from 'express-serve-static-core'
import { CREATED, SuccessResponse } from '~/core/success.response'
import UserService from '~/services/user.service'
import { asyncHandler } from '~/utils/asyncHandler'

const createUser = asyncHandler(async (req: Request, res: Response) => {
  new CREATED({
    message: 'User created successfully',
    metadata: await UserService.createUser(req.body)
  }).send(res)
})

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'User updated successfully',
    metadata: await UserService.updateUser(req.body, req, res)
  }).send(res)
})

export { createUser, updateUser }
