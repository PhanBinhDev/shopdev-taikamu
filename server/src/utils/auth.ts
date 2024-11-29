import crypto from 'crypto'
import { NextFunction } from 'express'
import { HEADER } from '~/constants/header'
import { ForbiddenError } from '../core/error.response'
import JWT from 'jsonwebtoken'
import config from '~/configs/env.config'

// static generateTokenPair = async (payload, publicKey, privateKey) => {}
const generateToken = (
  payload: object
): {
  accessToken: string
  refreshToken: string
} => {
  const private_key = process.env.PRIVATE_KEY
  if (!private_key) {
    throw new Error('Missing private key')
  }
  const accessToken = JWT.sign(payload, private_key, {
    algorithm: 'RS256',
    expiresIn: config.ACCESS_TOKEN_EXPIRE
  })

  const refreshToken = JWT.sign(payload, private_key, {
    algorithm: 'RS256',
    expiresIn: config.REFRESH_TOKEN_EXPIRE
  })
  return { accessToken, refreshToken }
}

export { generateToken }
// export class ApiKeyService {
//   static checkApiKey(req: Request, res: Response, next: NextFunction) {
//     const key =
//       req.headers[HEADER.API_KEY as keyof typeof req.headers]?.toString()

//     if (!key) {
//       return new ForbiddenError('Failed to check API key')
//     }

//     // const objKey = await findKeyByUserId(key)
//   }
// }
