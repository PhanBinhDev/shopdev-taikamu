import { Router } from 'express'
import { createUser, updateUser } from '~/controllers/user.controller'
import { validateRequest } from '~/middlewares/validator.middleware'
import { authentication } from '~/utils/auth'
import {
  createUserSchema,
  updateUserSchema
} from '~/validations/user.validation'

const router = Router()
router.post('/', validateRequest(createUserSchema), createUser)
router.put(
  '/profile',
  authentication,
  validateRequest(updateUserSchema),
  updateUser
)

export default router
