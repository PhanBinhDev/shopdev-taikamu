import { Router } from 'express'
import { registerUser, getUser } from '~/controllers/user.controller'

const router = Router()
router.post('/', registerUser)
router.get('/', getUser)

export default router
