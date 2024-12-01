import { Router } from 'express'
import {
  checkAuth,
  signIn,
  refreshToken,
  signOut
} from '~/controllers/auth.controller'
import { validateRequest } from '~/middlewares/validator.middleware'
import { authentication, verifyRefreshToken } from '~/utils/auth'
import { signInSchema } from '~/validations/auth.validation'

const router = Router()

router.post('/sign-in', validateRequest(signInSchema), signIn)
router.get('/me', authentication, checkAuth)

router.delete('/sign-out', verifyRefreshToken, signOut)
router.post('/refresh-token', verifyRefreshToken, refreshToken)

export default router
