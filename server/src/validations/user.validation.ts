import Joi from 'joi'
import { IUpdateProfileDTO, IUserDTO } from '~/dtos/user.dto'

export const createUserSchema = Joi.object<IUserDTO>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid('ADMIN', 'SHOP_OWNER', 'CUSTOMER')
    .default('CUSTOMER')
})

export const updateUserSchema = Joi.object<IUpdateProfileDTO>({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('ADMIN', 'SHOP_OWNER', 'CUSTOMER'),
  imageUrl: Joi.string(),
  gender: Joi.string(),
  phoneNumber: Joi.string(),
  birthDate: Joi.string(),
  isActive: Joi.boolean()
})
