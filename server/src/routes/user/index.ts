import { Router } from 'express'
import { signIn } from '~/controllers/auth.controller'
import { getUser, createUser } from '~/controllers/user.controller'
import { validateRequest } from '~/middlewares/validator.middleware'
import { asyncHandler } from '~/utils/asyncHandler'
import { createUserSchema } from '~/validations/user.validation'

const router = Router()
router.post('/', validateRequest(createUserSchema), createUser)
router.get('/', getUser)

export default router
