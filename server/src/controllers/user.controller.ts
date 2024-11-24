import { Request, Response } from 'express-serve-static-core'
import { StatusCodes } from 'http-status-codes'
import { CreateUserDto } from '~/dtos/CreateUser.dto'
import userService from '~/services/user.service'
import { CreateUserQueryParams } from '~/types/query-params'
import { User } from '~/types/response'
import { asyncHandler } from '~/utils/asyncHandler'
import { AppError } from '~/utils/errors'
import { SuccessResponse, CREATED } from '~/utils/success'

const getUser = async (req: Request, res: Response) => {
  res.send('Hello')
}

const registerUser = asyncHandler(
  async (req: Request<{}, {}, CreateUserDto>, res: Response<User>) => {
    new CREATED({
      message: 'User created successfully',
      metadata: await userService.registerUser(req.body)
    }).send(res)
  }
)
export { getUser, registerUser }
