import Joi from 'joi'
import { IUserDTO } from '~/dtos/user.dto'

export const signInSchema = Joi.object<IUserDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})
