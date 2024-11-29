import { Router } from 'express'
import { signIn } from '~/controllers/auth.controller'
import { validateRequest } from '~/middlewares/validator.middleware'
import { signInSchema } from '~/validations/auth.validation'

const router = Router()

router.post('/sign-in', validateRequest(signInSchema), signIn)

export default router
