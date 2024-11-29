import Joi from 'joi'
import { IUserDTO } from '~/dtos/user.dto'

export const createUserSchema = Joi.object<IUserDTO>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid('ADMIN', 'SHOP_OWNER', 'CUSTOMER')
    .default('CUSTOMER')
})
